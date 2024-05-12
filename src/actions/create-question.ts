'use server'

import {z} from 'zod'
import {prisma} from '@/db/index'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { paths } from '@/path'
import {auth} from '@/auth' 
import type {  Question, QuestionInfo } from '@prisma/client'
import { checkAdminUser } from './create-topic'

const htmlValidate = z.string().regex(/<[^/][^>]*\/?>/g, {message:'Problem statement must contain at least one opening HTML tag'}).regex(/<\/[^>]*>/g, {message:'Problem statement must contain at least one closing HTML tag'} )

// const createExampleSchema = z.object({
//     inputText: z.string().min(3),
//     outputText: z.string().min(3) ,
//     explanation: z.string().min(3),
//     img: z.string().min(3)
// })

const createQuestionSchema = z.object({
    //validate questionInfo
    title:  z.string().min(3),
    category: z.string().min(5),
    difficulty: z.string().min(4).regex(/^(easy|medium|hard)/,{message:'only 3 options are allowed easy / medium / hard'}),
    link:  z.string().min(10).regex(/^(?:http|https):\/\/[^ "]+$/, { message: 'Invalid URL format' }),
    //validate question
    problemStatement: htmlValidate ,
    constraints: htmlValidate,
    starterCode: z.string().min(5),
    handlerFunction:z.string().min(5),
    starterFunctionName:z.string().min(5),
    //validate array of question eg
    // examples: z.array(createExampleSchema),
    examples: z.string().min(5),
})

interface createQuestionFormState{
    errors:{
        title?: string[],
        category?: string[],
        difficulty?: string[], // custom error msg (easy,medium, hard)
        link?:  string[],
        problemStatement?: string[],
        constraints?: string[],
        starterCode?: string[],
        handlerFunction?:string[],
        starterFunctionName?:string[],
        examples?: string[], 
        _form?: string[], //custom error (check topic/user/other error)
    },
    success?: boolean;
}

export async function createQuestion(slug:string, formState:createQuestionFormState, formData:FormData):Promise<createQuestionFormState> {
    const result = createQuestionSchema.safeParse({
        title: formData.get('title') ,
        category: formData.get('category'),
        difficulty: formData.get('difficulty'),
        link: formData.get('link'),
        problemStatement: formData.get('problemStatement') ,
        constraints:formData.get("constraints"),
        starterCode: formData.get("starterCode") ,
        handlerFunction: formData.get("handlerFunction"),
        starterFunctionName:formData.get('starterFunctionName'),
        examples: formData.get('examples')
        // inputText: formData.get('inputText') ,
        // outputText: formData.get('outputText') ,
        // explanation: formData.get('explanation'),
        // img: formData.get('img'),
       
    })
    if(!result.success){
        return{
            errors: result.error.flatten().fieldErrors
        }
    }
    //check isAdminUser
    const session = await auth();
    const isAdminUser = `${session?.user?.email}`;
    const validateAdmin = await checkAdminUser(isAdminUser)// check admin user func found in create-topic.tsx
    if(!validateAdmin){
        return{
            errors:{
                _form:["Only Admin Users can create question"]
            }
        }
    }
    //check if topic slug is present/valid 
    const topic = await prisma.topic.findFirst({
        where:{slug}
    })
    if(!topic){
        return{
            errors:{
                _form:['no topic found!']
            }
        }
    }
    //check if title has been already created before
    const titleCheck = await prisma.questionInfo.findUnique({
        where:{ title:`${result.data.title}` },
    })
    if(titleCheck){
        return{
            errors:{
                title:['title already created!']
            }
        }
    }
    let questionInfo: QuestionInfo;
    let question: Question;
    // let examples: Example;
    try {
        //create record for questionInfo
        questionInfo = await prisma.questionInfo.create({
            data:{
                title: result.data.title, 
                category: result.data.category,
                difficulty: result.data.difficulty,
                link: result.data.link,
                userId: `${validateAdmin.userId}`,
                topicId: topic.id
            }
        })
        question = await prisma.question.create({
            data:{
                title: result.data.title, 
                problemStatement: result.data.problemStatement ,
                constraints: result.data.constraints,
                starterCode: result.data.starterCode ,
                handlerFunction: result.data.handlerFunction,
                starterFunctionName:result.data.starterFunctionName,
                examples: result.data.examples,
                questionInfoId:  questionInfo.id,
            }
        })
        console.log('questionInfo and question data',questionInfo,question)
        console.log("what is inside formState", formState)
    } catch (error: unknown) {
        if(error instanceof Error){
            return{
                errors:{
                    _form:[error.message],
                }
            }
        } else{
            return{
                errors:{
                    _form:['something went wrong'],
                }
            }
        }
    }
    revalidatePath(paths.topicShow(slug))
    redirect(paths.home())
    return {
        errors:{},
        success: true,
    }
}