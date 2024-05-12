'use client'
import QuestionIDENav from "./question-IDE-nav";
import Split from "react-split";
import CodeMirror from '@uiw/react-codemirror'
import {vscodeDark} from '@uiw/codemirror-theme-vscode'
import {javascript} from '@codemirror/lang-javascript'
import { Button } from "@nextui-org/react";
import QuestionIDEFooter from "./question-IDE-footer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import updateAttemptCount from "@/actions/updateAttemptCount";
// import assert from "assert";

interface PlaygroundProps{
  questionDetails: any;
  setSuccess: any;
  
}

export default function Playground({questionDetails, setSuccess }: PlaygroundProps) {
  const [activeTestCase, setActiveTestCase]= useState(0);
  const [attemptQuestion, setAttemptQuestion]= useState(false);
  const [currentSolved, setCurrentSolved] = useState(false);
  const [userCode, setUserCode] = useState<string>("");
  const handlerFunctionString = questionDetails?.handlerFunction.replace(/'/g, '');
  const boilerPlate = questionDetails.starterCode;
  const session = useSession();
  const Id = questionDetails.questionInfoId
  //parse Example JSON from string
  interface ExampleDetails {
    inputText: string;
    outputText: string;
    explanation?: string;
    img?: string;
  }
  let testCases: ExampleDetails[] = [];
  testCases = JSON.parse(questionDetails.examples)  

  const handleSubmitAnswer = ()=>{
    setAttemptQuestion(true)
    console.log('handlerFunctionString ===', handlerFunctionString)
    if(!session.data?.user){
      toast.error('please login to submit answer',{position: 'top-center', autoClose: 3000, theme:"dark"
      })
      console.log('answer submitted')
    }
   
    try {
      const userFunction = new Function('return '+ userCode)(); //convert user's input from string to function

      console.log("🚀 ~ ~ userCode:", userCode)
      
      console.log("🚀 ~ userFunction:", userFunction)
      
      const handlerFunction = new Function('return '+ handlerFunctionString)();
      console.log("🚀 ~  handlerFunction:", handlerFunction)

      const currentSolved = handlerFunction(userFunction);
      
      if(currentSolved === true) {
        toast.success("congrats all test cases passed!!", {
          position: 'top-center',
          autoClose:3000,
          theme:"dark"
        })
        setCurrentSolved(true);
        setSuccess(true);
        setTimeout(() => {setSuccess(false); setAttemptQuestion(false); setCurrentSolved(false)}, 2000)

      }else if (currentSolved !== true){
      toast.error("Answer Is Wrong, Please Try Again", {
        position: 'top-center',
        autoClose: 3000,
        theme: "dark"
      });
      setTimeout(() => { setAttemptQuestion(false) }, 2000);
    }
      
    } catch (error) {
      toast.error("Error in your function. Please check code and try again.", {
        position: 'top-center',
        autoClose: 3000,
        theme: "dark"
      });
      setTimeout(() =>{setAttemptQuestion(false)}, 2000)
      console.log(error)
    }
  }
  useEffect(()=>{
    if(attemptQuestion === true){
      const attemptCountUpdate = async()=> {
        
        const update = await updateAttemptCount(Id);
        if(!update){
          setAttemptQuestion(false);
        }
      }
      attemptCountUpdate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[attemptQuestion, Id])
   

  const onChange =(value: string)=>{
    setUserCode(value);
    console.log(value)
  }
  
  return (
    <div className="flex flex-col bg-dark-layer-1 relative">
      <QuestionIDENav />
      <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60,40]} minSize={60}>
        {/* IDE */}
        <div className="w-full overflow-y-auto scroll">
          <CodeMirror
            value={userCode? userCode: boilerPlate}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{fontSize:16}}
          />
        </div>
        {/* test case section*/}
        <div className="w-full px-5 overflow-y-auto">
          {/* test case heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex flex-col h-full justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white" >Testcases</div>
              <hr className="w-16 absolute bottom-0 h-0.5 rounded-full border-none bg-white"/>
            </div>
          </div>
          {/* test cases */}
          <div >
            {testCases.map((testCase, index) =>(
              <Button onClick={()=>setActiveTestCase(index)} key={index} className={`${activeTestCase === index ?" text-white":"text-gray-500"} mr-3 mt-2 bg-dark-fill-3`}>
                Case {index} 
              </Button> 
            )
            )}
          </div>
          {/* display of test cases in / output */}
          <div className="font-semibold my-4">
            <p className="text-sm mt-4 text-white ">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-2 bg-dark-fill-3 border-transparent text-white">
              {testCases[activeTestCase].inputText}
            </div>
            <p className="text-sm mt-4 text-white ">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-2 bg-dark-fill-3 border-transparent text-white">
            {testCases[activeTestCase].outputText}
            </div>
          </div>
        </div>
      </Split>
      <QuestionIDEFooter handleSubmitAnswer={handleSubmitAnswer} />
    </div>
      
  )
}
