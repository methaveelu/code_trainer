// 'use server'
import type {QuestionInfo} from "@prisma/client";
import {prisma} from '@/db/index'
import { cache } from "react";

export type QuestionInfoData = (
    QuestionInfo & {
        topic:{slug: string},
        _count:{comments: number},  //_count is a special keyword in prisma to access the property count.
        user: {name : string | null, email : string | null, image : string | null}     
    }
)
//query 1 - questions by topic
 export const fetchQuestionByTopic=cache(async(slug: string): Promise<QuestionInfoData[]>=>{
    console.log("🚀 ~ fetchQuestionByTopic ~ fetchQuestionByTopic:", fetchQuestionByTopic)
    return prisma.questionInfo.findMany({
        where:{topic: {slug}},
        include: {
            topic:{select:{slug:true}},
            _count:{select:{comments:true}},  
            user: {select: {name :true, email:true, image:true} } 
        }
    })
 } )
 
 //query 2 - question by questionInfoId
//  export const fetchOneQuestionInfo = cache(async(questionInfoId: string)=>{
//     console.log("🚀 ~ fetchOneQuestionInfo ~ fetchOneQuestionInfo:", fetchOneQuestionInfo)
//     return prisma.questionInfo.findFirst({
//         where:{id: questionInfoId},
//     })
// })
export async function fetchOneQuestionInfo (questionInfoId: string) {
    console.log("🚀 ~ fetchOneQuestionInfo ~ fetchOneQuestionInfo:", fetchOneQuestionInfo)
    return prisma.questionInfo.findFirst({
        where:{id: questionInfoId},
    })
}

//query 3 - question by order
export const fetchNextQuestionId = cache(async(order: number)=>{
console.log("🚀 ~ fetchNextQuestionId ~ fetchNextQuestionId:", fetchNextQuestionId)
    return prisma.questionInfo.findFirst({
        where:{order: {equals:order+1}},
        select:{id: true, order:true},
    })
})

 // query 3 - fetch top questions by comments
 export async function fetchTopQuestions():Promise<QuestionInfoData[]>{
    console.log("🚀 ~ fetchTopQuestions ~ fetchTopQuestions:", fetchTopQuestions)
    return prisma.questionInfo.findMany({
        orderBy:[
            {comments:{_count:'desc'}}
        ],
        include: {
            topic:{select:{slug:true}},
            user: {select: {name :true, email:true, image:true} } ,
            _count:{select:{comments:true}},
        },
        take: 8,
    })
 } 

 //query4 - fetch most attempted questions
 export async function mostAttemptedQuestions(){
    return prisma.questionInfo.findMany({
        orderBy:[
            {attemptCount:'desc'}
        ],
        select:{title:true, attemptCount:true, topic:{select:{slug:true}}},
    })
 }