/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from "next/image";
// import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { useSession } from "next-auth/react";
import getUserData from "@/db/queries/userAndQuestionInfo";
import updateUserQuestionData from "@/actions/updateUserandQuestionInfo";

interface QuestionDescriptionProps {
	questionInfo: any;
	questionDetails: any;
	solvedDisplay: any;
}

export default function QuestionDescription(
  {questionInfo, questionDetails, solvedDisplay}: QuestionDescriptionProps
) {	
	// const [update, setUpdate] = useState(false);
	const [counts, setCounts]= useState({likeCount: questionInfo.likes, dislikeCount: questionInfo.dislikes, starCount: questionInfo.starred })
	const countKeys = Object.keys(counts);
	const questionInfoId = questionInfo.id;
	const session = useSession();
	 
	const [userId, setUserId] =useState("")
	useEffect(()=>{
		if(session.data && session.data.user){
			setUserId(session.data?.user?.id)
		}
	}, [session.data])


	const { liked, disliked, starred, solved, setState } = useUserData(questionInfoId, userId);

	const handleSolved = async()=>{
		if (solved === false){
			setState((prevState)=>({...prevState, solved:true}));
			const action  = "solved";
			const result = await updateUserQuestionData(userId, questionInfoId, action);

			if(!result){	
				setState((prevState)=>({...prevState, solved:false}));
			}
		} 
	}
	useEffect(()=>{
		if(solvedDisplay === true){
			handleSolved();
		}
	}, [solvedDisplay])
	
	
    const handleLike = async (likeCount: string ) => {

        setState((prevState) => ({ ...prevState, liked: !prevState.liked }));

        // Determine the action based on new state.
        const action = !liked ? "like" : "un-like";

        const result = await updateUserQuestionData(userId, questionInfoId, action); 

        // If the action was not successful, revert the state
        if (!result) { 
            setState((prevState) => ({ ...prevState, liked: !prevState.liked }));
        }
		if (action === "like") {
			setCounts((prevCount)=>({
				...prevCount,
				[likeCount]: prevCount.likeCount +1,
			}))
		} else {
			setCounts((prevCount)=>({
				...prevCount,
				[likeCount]: prevCount.likeCount -1,
			}))
		}
    }

    const handleDislike = async (dislikeCount:string) => {
        setState((prevState) => ({ ...prevState, disliked: !prevState.disliked }));

        const action = !disliked ? "dislike" : "un-dislike";
        const result = await updateUserQuestionData(userId, questionInfoId, action);

        if (!result) {
            setState((prevState) => ({ ...prevState, disliked: !prevState.disliked }));
        }
		if (action === "dislike") {
			setCounts((prevCount)=>({
			...prevCount,
			[dislikeCount]: prevCount.dislikeCount + 1,
		}))} else {
			setCounts((prevCount)=>({
				...prevCount,
				[dislikeCount]: prevCount.dislikeCount - 1
			}))
		}
    }

    const handleStar = async () => {
        setState((prevState) => ({ ...prevState, starred: !prevState.starred }));

        const action = !starred ? "star" : "un-star";
        const result = await updateUserQuestionData(userId, questionInfoId, action);

        if (!result) {
            setState((prevState) => ({ ...prevState, starred: !prevState.starred }));
		}
    }


 //css function for difficulty
 let problemDifficultyClass;
 if(questionInfo.difficulty === 'easy'){
	problemDifficultyClass = 'bg-olive text-olive';
 } else if (questionInfo.difficulty === 'medium'){
	problemDifficultyClass = 'bg-dark-yellow text-dark-yellow'
 } else {
	problemDifficultyClass = 'bg-dark-pink text-dark-pink'
 }

 // parse the string of exmaples to array
  interface ExampleDetails {
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
 }
 let examples : ExampleDetails[] = [];//declare examples as an array of ExampleDetails objects 
 examples =  JSON.parse(questionDetails.examples)

  return (
    <div className='bg-dark-layer-1'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Question 
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						{/* problem title */}
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>
							{questionDetails.title}
							</div>
						</div>
						{/* { currentProblem && ( */}
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClass}  inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{questionInfo.difficulty}
								</div>
								{solved  && (
									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
										<BsCheck2Circle />
									</div>
								)}
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
									onClick={()=>handleLike(countKeys[0])}
								>
									{liked && <AiFillLike className='text-dark-blue-s' />}
									{!liked && <AiFillLike className='text-gray-950'/>}
									{/* {<AiOutlineLoading3Quarters className='animate-spin' />} */}

									<span className='text-xs'>
										{/* {currentProblem.likes} */}
										{counts.likeCount}
									</span>
								</div>
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
									onClick={()=>handleDislike(countKeys[1])}
								>
									{disliked && <AiFillDislike className='text-dark-blue-s' />}
									{!disliked && <AiFillDislike className='text-gray-950' />}
									{/* {<AiOutlineLoading3Quarters className='animate-spin' />} */}

									<span className='text-xs'>
										{counts.dislikeCount}
									</span>
								</div>
								<div
									className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
									onClick={handleStar}
								>
									{ starred && <AiFillStar className='text-dark-yellow' />}
									{!starred && <TiStarOutline />}
									{/* {<AiOutlineLoading3Quarters className='animate-spin' />} */}
								</div>
							</div>
						{/* )} */}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							{/* dangerouslySetInnerHTML is susceptible to xss attacks. */}
							<div dangerouslySetInnerHTML={{ __html: questionDetails.problemStatement }} />
						</div>

						{/* Examples */}
						<div className='mt-4'>
							{examples.map((example, index) => (
								<div key={index}>
									<p className='font-medium text-white '>Example {index + 1}: </p>
									{example.img? <Image src={example.img} alt='' className='mt-3' /> : null}
									<div className='example-card text-white'>
										<pre>
										{example.inputText}
										{example.outputText} <br />
										{example.explanation && (
											<>
											<strong>Explanation:</strong> 
											{example.explanation}
											</>
										)}
										</pre> 
										
									</div>
								</div>
							 ))} 
						</div>

						{/* Constraints */}
						<div className='my-8 pb-4'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc '>
								<div dangerouslySetInnerHTML={{ __html: questionDetails.constraints }} />
							</ul>
						</div>
					</div>
				</div>
			</div>
      
		</div>
  )
}



function useUserData(questionInfoId: any, userId: any){
	console.log('inside useUserData!', userId, questionInfoId)
	const[state, setState] = useState({ liked: false, disliked: false, starred: false, solved: false });

	useEffect(() => {
		const getuseUserDataOfQuestion = async ()=>{

			if(userId){
				const data = await getUserData(userId,questionInfoId);	
				console.log("🚀 ~ getuseUserDataOfQuestion ~ data:", data)
			setState({
				liked: data?.likedProblems?.questionInfoId === questionInfoId || false,
				disliked: data?.dislikedProblems?.questionInfoId === questionInfoId || false,
				starred: data?.starredProblems?.questionInfoId === questionInfoId || false,
				solved: data?.solvedProblems?.questionInfoId === questionInfoId || false
			})
			}
		}
		getuseUserDataOfQuestion();
	},[questionInfoId, userId]);
	console.log("returned state", {...state, setState})
	return { ...state, setState };
	// return state;
	
}