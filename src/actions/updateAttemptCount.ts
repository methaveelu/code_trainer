'use server'

import { prisma } from "@/db"
import { revalidatePath } from "next/cache";

export default async function updateAttemptCount(questionInfoId:string){
    try {
        await prisma.questionInfo.update({
            where: {id:questionInfoId},
            data:{attemptCount:{increment: 1}},
        })
        revalidatePath('/')
        return true;
        console.log("Attempt count updated");
    } catch (error: any) {
        console.log("Error while updating attempt count", error.message)
    }

}