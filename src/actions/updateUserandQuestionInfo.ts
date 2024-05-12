'use server'

import { prisma } from "@/db";

export default async function updateUserQuestionData (userId: string, questionInfoId:string, actionType: string) {
    switch (actionType) {
        case "un-like":
            try {
                await prisma.likedProblems.delete({
                    where: {
                        userId_questionInfoId:
                            {
                                userId: userId,
                                questionInfoId:questionInfoId,
                            }
                    }
                })
                await prisma.questionInfo.update({
                    where:{id:questionInfoId},
                    data: {likes: {decrement: 1}},
                })
             console.log("UN-liked problem")   
            } catch (error:any) {
                console.log("🚀 ~ un-LIKE Data ~ error:", error)
            }
            
        break;
        case "like":
            try {
                await prisma.likedProblems.create({
                    data: {
                        userId: userId,
                        questionInfoId:questionInfoId,
                    }
                })
                await prisma.questionInfo.update({
                    where:{id:questionInfoId},
                    data: {likes:{increment:1}},
                })
                console.log("liked problem")   
            } catch (error:any) {
                console.log("🚀 ~ LIKE Data ~ error:", error)
            }
            
        break;
        case "un-dislike":
            try {
                await prisma.dislikedProblems.delete({
                    where: {
                        userId_questionInfoId:
                            {
                                userId: userId,
                                questionInfoId:questionInfoId,
                            }
                    }
                })
                await prisma.questionInfo.update({
                    where:{id:questionInfoId},
                    data: {dislikes: {decrement: 1}},
                })
                console.log("un-disliked problem")  
            } catch (error:any) {
                console.log("🚀 ~  UN-DISLIKE Data ~ error:", error)
            }
        break;
        case "dislike":
            try {
                await prisma.dislikedProblems.create({
                   data: {
                        userId: userId,
                        questionInfoId:questionInfoId,
                    }
                })
                await prisma.questionInfo.update({
                    where:{id:questionInfoId},
                    data: {dislikes:{increment:1}},
                })
                console.log("disliked problem")  
            } catch (error:any) {
                console.log("🚀 ~ DISLIKE Data ~ error:", error)
            }
        break;
        case "un-star":
            try {
                 await prisma.starredProblems.delete({
                    where: {
                        userId_questionInfoId:
                            {
                                userId: userId,
                                questionInfoId:questionInfoId,
                            }
                    }
                })
                await prisma.questionInfo.update({
                    where:{id:questionInfoId},
                    data: {starred:{decrement:1}},
                })
                console.log("delete star problem")  
            } catch (error:any) {
                console.log("🚀 ~ delete STAR Data ~ error:", error)
            }         
        break;
        case "star":
            try {
                 await prisma.starredProblems.create({
                    data: {
                        userId: userId,
                        questionInfoId:questionInfoId,
                    
                    }
                })
                await prisma.questionInfo.update({
                    where:{id:questionInfoId},
                    data: {starred:{increment:1}},
                })
                console.log("add star problem")  
            } catch (error:any) {
                console.log("🚀 ~ add STAR Data ~ error:", error)
            }         
        break;
        case "solved": 
            try {
                await prisma.solvedProblems.create({
                    data: {
                        userId: userId,
                        questionInfoId:questionInfoId,
                    }
                })
                await prisma.questionInfo.update({
                    where:{id:questionInfoId},
                    data:{solved: true},
                })
                console.log("problem Solved updated successfully!")
            
            } catch (error) {
                
            }
    
        default:
            console.log("invalid action type")
            break;
    }
   
    return true;
}