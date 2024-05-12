import  {prisma} from '@/db/index'
import type { Comment } from '@prisma/client'
import { cache } from 'react'

export type CommentWithAuthor = (
    Comment & 
    {user:{name: string | null, image: string | null}}
)

// export const fetch1stComment = (questionInfoId:string):Promise<CommentWithAuthor | null> =>{
//     console.log("fetching 1st comment!");
//     console.log("questionInfoId fetch by firstComment", questionInfoId);
//     return prisma.comment.findFirst({
//             where: {questionInfoId: questionInfoId},
//             include:{user:{select:{name:true, image:true}}}
//     }
//     )

// }

export const fetchCommentsByQuestionId = cache((questionInfoId:string):Promise<CommentWithAuthor[]> =>{
    console.log("fetching comments by question!");
    return prisma.comment.findMany({
            where: {questionInfoId: questionInfoId},
            orderBy: {createdAt:'asc'},
            include:{user:{select:{name:true, image:true}}}
    }
    )
})