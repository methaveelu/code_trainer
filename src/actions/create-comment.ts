"use server";

import {prisma} from '@/db/index'
import {auth} from '@/auth'
import { paths } from "@/path";
import {z} from 'zod'
import type { Comment } from "@prisma/client";
import { checkAdminUser } from "./create-topic";
import { revalidatePath } from 'next/cache';

const createCommentSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(15)
})

interface createCommentFormState {
    errors:{
        title?: string[];
        content?: string[];
        _form?: string[];
    },
    success?: boolean;
}


export async function createComment(
    {questionInfoId, parentId}:{questionInfoId: string, parentId?: string},
    formState:createCommentFormState,
    formData: FormData
    ): Promise<createCommentFormState> {
    const result = createCommentSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })
    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();
    if(!session || !session.user){
        return {
            errors:{
                _form:["Please Log in to comment"]
            }
        }
    }

    let createOneComment: Comment
    const userEmail = `${session?.user?.email}`
    const validateAdmin = await checkAdminUser(userEmail);
    try {
        createOneComment = await prisma.comment.create({
            data:{
                title: result.data.title,
                content: result.data.content,
                questionInfoId: questionInfoId,
                userId: `${validateAdmin.userId}`,
                parentId: parentId
            }
        })
        console.log("comment created!",createOneComment);
        
    } catch (error ) {
        if(error instanceof Error){
            return {
                errors:{
                    _form:[error.message],
                },
            };
        } else {
            return{
                errors:{
                    _form:["Something went wrong"]
                }
            };
        }
        
    }
    
    const topic = await prisma.topic.findFirst({
        where: {questionInfo:{some:{id: questionInfoId}}}
    })
    if (!topic) {
        return {
          errors: {
            _form: ["Failed to revalidate topic"],
          },
        };
    }
    revalidatePath(paths.postShow(topic?.slug, questionInfoId))
    return {
        errors:{},
        success: true,
    }
}