

import { prisma } from '@/db/index'
import { cache } from 'react'
import type { SolvedProblems } from '@prisma/client';


export type latestQuestionsSolved =(
    SolvedProblems & 
    {questionInfo:{title: string | null}, user:{email: string | null, image: string | null, name: string | null}}
)

export async function userSolvedQuestions(userId:string){
    console.log('fetching userSolvedQuestions');
    return prisma.solvedProblems.count({
        where:{userId: userId },
    })
}

export const recentSolvedQuestions = cache(():Promise<latestQuestionsSolved[]>=>{
    console.log('fetching recent questions solved')
    return prisma.solvedProblems.findMany({
        take:5,
        include:{
            questionInfo:{select:{title:true}},
            user:{select:{email:true,image:true,name:true}},
        }
    })
})