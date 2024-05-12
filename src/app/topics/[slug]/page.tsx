"use server";

import QuestionCreateForm from "@/components/questions/question-create-form";
import QuestionList from "@/components/questions/question-list";
import { fetchQuestionByTopic } from "@/db/queries/questionsInfo";

interface TopicShowPageProps{
  params:{
    slug: string
  }
}


export default async function TopicShowPage ({params}: TopicShowPageProps) {
  const {slug} = params; 
  const data = await fetchQuestionByTopic(slug);
  // const recentSolvedQuestions = await 
  
  return (
    <div className="grid grid-cols-4 gap-8 p-4 h-screen" style={{backgroundColor:'#191f45'}}>
      <div className="col-span-3">
        <h1 className="text-3xl font-bold mb-3">
          {slug}
        </h1>
        <QuestionList questions={data}/>
      </div>
      <div>
        <QuestionCreateForm slug={slug}/>
      </div>
    </div>
  )
}