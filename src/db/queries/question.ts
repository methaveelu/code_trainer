'use server'
import {prisma} from '@/db/index'

export  async function  fetchQuestionDetails (questionInfoId: string){
    console.log("🚀 ~ fetchQuestionDetails ~ questionInfoId:", questionInfoId)
    console.log("🚀 ~ fetching Question Details ", fetchQuestionDetails)
    return prisma.question.findFirst({
        where:{questionInfoId : questionInfoId}
    })
}

export async function  fetchAllQuestionId (){
    return prisma.question.findMany({
        select:{questionInfoId: true}
    })
}

export async function allQuestionCount(){
    return prisma.question.count();
}

