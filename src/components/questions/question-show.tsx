'use client'
import Split from 'react-split'
import QuestionDescription from './question-description'
import Playground from './question-IDE';
import { Suspense } from 'react';
// import Loader from '../Loader/LoaderIDE';
import LoaderIDE from '../Loader/LoaderIDE';
import { useState, useEffect } from 'react';

interface WorkSpaceProps {
    questionInfo: any;
    questionDetails: any;
    // setAttemptQuestion: any;
}

export default function WorkSpace(
  {questionInfo, questionDetails }: WorkSpaceProps
  ) {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [solved, setSolved] = useState(false)
    
    useEffect(() => {
      if (questionInfo && questionDetails) {
        setLoading(false);
      }
    }, [questionInfo, questionDetails]);

    useEffect(() => {
      if(success === true){
        setSolved(true);
      } 
    },[ solved, success])

    
  return (
    <div>
    {loading? (
      <LoaderIDE/>
    ):(
      // <Suspense fallback={<LoaderIDE/>}>
    <Split className="split h-screen border border-t-slate-700">
      <QuestionDescription  
        questionInfo = {questionInfo}
        questionDetails = {questionDetails}
        solvedDisplay = {solved}
        />
      <Playground questionDetails = {questionDetails} setSuccess={setSuccess} />
    </Split>
    // </Suspense>
    )}
    </div>
  )
}

