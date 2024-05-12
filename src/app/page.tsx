import TopicCreateForm from "@/components/topics/topic-create-form";
import {auth} from '@/auth'
// import { redirect } from "next/navigation";
import SignInHero from "@/components/SignInHero";
import signInHero from '../../public/signInHero.jpg'
import { Divider } from "@nextui-org/react";
import TopicList from "@/components/topics/topic-list";
import ProgressPie from "@/components/HomeUI/progressPie";
import { recentSolvedQuestions, userSolvedQuestions } from "@/db/queries/solvedQuestions";
import { allQuestionCount } from "@/db/queries/question";
import ActivityTable from "@/components/HomeUI/activityTable";
import { mostAttemptedQuestions } from "@/db/queries/questionsInfo";
import BarChartTrending from "@/components/HomeUI/barChartTrending";
// import ActivityTable from "@/components/HomeUI/activityTable";


export default async function Home() {

  const session = await auth();
  const userId:any = session?.user?.id
  const solvedQuestionsUser = await userSolvedQuestions(userId);
  const totalQuestions = await allQuestionCount();
  const percentQuestion = ((solvedQuestionsUser / totalQuestions) * 100).toFixed(1);
  const latestSolvedQuestions = await recentSolvedQuestions();
  const topAttemptedQuestions = await mostAttemptedQuestions();

  if (!solvedQuestionsUser){
    return undefined;
  }
  let signInContent: React.ReactNode
  if(!session?.user?.name){
    signInContent=(
      <div>
      <SignInHero ImgData={signInHero} title='code trainer'/>
      </div>
    )
  } else if (session?.user){
    signInContent=(
    <div className="grid grid-cols-4 gap-4 p-4 h-screen" style={{backgroundColor:'#191f45', height: '100%'}}>
      <div className="col-span-3 h-screen">
            <div className= 'highlights ' >
                  <div className="highlight-container">   
                        <div className="grid grid-cols-3 highlight-card card1 " style={{backgroundColor:'#21295c'}}>
                            <div className="col-span-2 highlight-content">
                                  <h4 >User Progress </h4>
                              {/* progress pie chart */}
                              <ProgressPie solvedQuestionsUser={solvedQuestionsUser} totalQuestions={totalQuestions}/>
                            </div>
                            <div className="flex flex-col items-center justify-center pr-4 pb-20" >
                              <h3 className="mb-4 pl-4">Percentage Completion</h3>
                              <p className="text-3xl font-bold text-gradient ">
                                  {percentQuestion} %
                              </p>
                            </div>
                        </div>

                        <div className="highlight-card card2" style={{backgroundColor:'#21295c'}}>
                            <div className="highlight-content ">
                                <h4 >Latest Activity</h4>
                            </div>
                            {/* Users recent activity. Table (name, question solved, Date and time) */}
                           <div className="m-6">
                            <ActivityTable latestSolvedQuestions={latestSolvedQuestions} />
                           </div>
                        </div>
                  </div>
                  <div className="highlight-container" >
                      <div className="highlight-card card3" style={{backgroundColor:'#21295c'}}>
                          <div className="highlight-content ">
                              <h4 >Trending Questions</h4>
                          </div>
                          {/* top questions based on attemptCount. Table */}
                          <BarChartTrending topAttemptedQuestions={topAttemptedQuestions} />
                      </div>
                
                      <div className="highlight-card card4" style={{backgroundColor:'#21295c'}}>
                          <div className="highlight-content ">
                              <h4 ></h4>
                          </div>
                      </div>
                  </div>
            </div>
      </div>
      <div className="border shadow p-2 h-screen">
        <TopicCreateForm/>
        <Divider className="my-2"/>
        <h3 className="text-lg">Topics</h3>
        <TopicList/>
      </div>
    </div>
    )
  }
  return (signInContent);
}