
'use server';

import { fetchOneQuestionInfo } from "@/db/queries/questionsInfo";
import QuestionAttempt from '@/components/questions/question-attempt';
import {fetchAllQuestionId, fetchQuestionDetails} from "@/db/queries/question";

interface AttemptQuestionPageProps {
  params:{
    slug: string,
    questionId: string,
  }
}

export default async function AttemptQuestionPage({params}: AttemptQuestionPageProps) {

  const {slug, questionId} = params;

  const fetchQuestionData = async (questionId:string) => {
    const questionDetails = await fetchQuestionDetails(questionId);
    const questionInfo = await fetchOneQuestionInfo(questionId);
    return { questionDetails, questionInfo };
  }

  const fetchAllIdInfo = async()=>{
    const fetchIDsObj = await fetchAllQuestionId();
    return {fetchIDsObj};
  }

  const initialData = await fetchQuestionData(questionId);
  const orderObj = await fetchAllIdInfo();

  return (
    <QuestionAttempt 
      questionIdObj={orderObj.fetchIDsObj} 
      questionDetails={initialData?.questionDetails} 
      questionInfo={initialData?.questionInfo} 
      slug={slug} 
      questionId={questionId}
    />
  )
}
