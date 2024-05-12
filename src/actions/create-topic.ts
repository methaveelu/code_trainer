
'use server'
import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/db/index';
import type {Topic} from '@prisma/client'
import { redirect } from 'next/navigation';
import { paths } from '@/path';
import { revalidatePath } from 'next/cache';



//regex for input format
const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z]+(?:-[a-z]+)*$/, { message: 'must be lowercase letters or dashes without spaces' }),
    description: z.string().min(10),
});

//structure of error for handling different errors
interface createTopicFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    },
}

export async function createTopic(formState: createTopicFormState, formData: FormData): Promise<createTopicFormState> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    //extract user email from nextAuth and use it to ref with DB to check if this user isAdmin
    let topic : Topic
    try {
        const session = await auth(); 
        const user = session?.user;

        if (!user) {
            throw new Error('User not found in session');
        }

        const  userEmail =`${user.email}`//same format as google auth's mail
        const isAdmin = await checkAdminUser(userEmail);
        console.log('isAdmin',isAdmin);
        if (isAdmin.isAdmin === false) {
            return {
                errors: {
                    _form: ['Only allowed for admin users']
                },
            };
        }

        // Proceed with topic creation logic
        topic = await prisma.topic.create({
            data:{
                slug: result.data.name,
                description: result.data.description
            }
        })
     
    } catch (error) {
        console.error('Error creating topic:', error);
        return { errors: { _form: ['An error occurred while creating the topic'] } };
    }
    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))
      
    
}

////////helper function to validate if current user is admin user
interface AdminCheckResult {
    isAdmin: boolean;
    userId: string | null;
}

export async function checkAdminUser(email: string): Promise<AdminCheckResult> {
    try {
        const user = await prisma.user.findFirst({
            where: { email, isAdmin: true },
        });
        console.log('user id value',user?.id);
        return {
            isAdmin: !!user,
            userId: user?.id || null
        };
    } catch (error) {
        console.error('Error checking admin user:', error);
        return {
            isAdmin: false,
            userId: null
        };
    }
}
