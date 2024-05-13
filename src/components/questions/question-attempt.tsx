'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import { BsList } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WorkSpace from "./question-show";
import Timer from "./question-timer";

interface QuestionAttemptProps {
    questionIdObj: {questionInfoId: string;}[],
    questionDetails: any,
    questionInfo: any,
    slug: string,
    questionId: string
}

export default function QuestionAttempt({ questionIdObj, questionDetails, questionInfo, slug, questionId }: QuestionAttemptProps) {
    const questionIds = questionIdObj.map(obj => obj.questionInfoId); // extract 'questionInfoId' property from each object
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  
    const questionLastIndex = questionIds.length - 1;
    const [questionDetailsData, setQuestionDetailsData] = useState(questionDetails);
    const [questionInfoData, setQuestionInfoData] = useState(questionInfo);
    // const [attemptQuestion, setAttemptQuestion]= useState(false)
    const router = useRouter();

    useEffect(()=>{
        const checkCurrentIndex = () =>{
            for(let i=0 ; i < questionIds.length ; i++){
                if(questionIds[i] === questionId ){
                    setCurrentQuestionIndex(i);
                    return;
                }
            }
        }
        checkCurrentIndex();
    },[questionId, questionIds])
    
    

    const handleOrderIncrease = async () => {
        console.log("🚀 ~ handleOrderIncrease ~ currentQuestionIndex:", currentQuestionIndex)
      console.log('order increase');
        if (currentQuestionIndex < questionLastIndex) { 
            const newIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(newIndex);
            router.push(`/topics/${slug}/questions/${questionIds[newIndex]}`);
            router.prefetch(`/topics/${slug}/questions/${questionIds[newIndex-1]}`);
        } else if (currentQuestionIndex === questionIds.length - 1) {
          console.log('skip to first question');
          setCurrentQuestionIndex(0);
          router.push(`/topics/${slug}/questions/${questionIds[0]}`);
        }
    };

    const handleOrderDecrease = async () => {
        console.log("🚀 ~ handleOrderIncrease ~ currentQuestionIndex:", currentQuestionIndex)
      console.log('order decrease');
        if (currentQuestionIndex > 0) {
            const newIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(newIndex);
            router.push(`/topics/${slug}/questions/${questionIds[newIndex]}`);
            router.prefetch(`/topics/${slug}/questions/${questionIds[newIndex-1]}`)
        } else if (currentQuestionIndex === 0) {
          console.log('skip to last question');
        //   const lastIndex = questionLastIndex;
          setCurrentQuestionIndex(questionLastIndex);
          router.push(`/topics/${slug}/questions/${questionIds[questionLastIndex]}`);
        }
    };

    return  (
        <div>
            <div className='flex w-full items-center justify-between h-12 p-5' style={{backgroundColor:'#191f45'}}>
                <div className='flex justify-center'>
                    <div className='flex justify-center items-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'>
                        <FaChevronLeft onClick={handleOrderDecrease} />
                    </div>
                    <Link href={`/topics/${slug}`} className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'>
                        <div>
                            <BsList/>
                        </div>
                        Questions 
                    </Link>
                    <div className='flex justify-center items-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'>
                        <FaChevronRight onClick={handleOrderIncrease} />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Timer/>
                </div>
            </div>
            <WorkSpace
                questionDetails = {questionDetailsData}
                questionInfo = {questionInfoData}
                // setAttemptQuestion = {setAttemptQuestion}
            />
        </div>
    );
}

