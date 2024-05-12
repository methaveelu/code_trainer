'use server'
import {prisma} from '@/db/index'


export default async function getUserData(userId: string, questionInfoId:string){
    try {
        const likedProblems = await prisma.likedProblems.findFirst({
          where: {
            userId: userId,
            questionInfoId:questionInfoId,
          },
          select:{
            questionInfoId:true,
          }
        });

        const dislikedProblems = await prisma.dislikedProblems.findFirst({
            where: {
                userId: userId,
                questionInfoId:questionInfoId,
              },
              select:{
                questionInfoId:true,
              }
        });
        const starredProblems = await prisma.starredProblems.findFirst({
            where: {
                userId: userId,
                questionInfoId:questionInfoId,
              },
              select:{
                questionInfoId:true,
              }
        });
        const solvedProblems = await prisma.solvedProblems.findFirst({
            where: {
                userId: userId,
                questionInfoId:questionInfoId,
              },
              select:{
                questionInfoId:true,
              }
        });

        // The same for starredProblems and solvedProblems 

        // Check query results
        if (!likedProblems) {
            console.error("No liked problems for this user and question");
        }
        if (!dislikedProblems) {
            console.error("No disliked problems for this user and question");
        }
        if (!starredProblems) {
            console.error("No satrred problems for this user and question");
        }
        if (!solvedProblems) {
            console.error("No solved problems for this user and question");
        }
        // Do the same for the rest of the query results

        return { likedProblems, dislikedProblems, starredProblems, solvedProblems };

    } catch (error: any) {
        console.error("Error while fetching user data:", error.message);
    }
}
