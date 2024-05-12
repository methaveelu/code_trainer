

import QuestionIDENav from "../questions/question-IDE-nav"
import { Skeleton } from "@nextui-org/react"
import QuestionIDEFooter from "../questions/question-IDE-footer"
import Split from "react-split"
import LoaderIDETestcase from "./LoaderIDETestcase"

export default function LoaderIDERight() {
    return(
    <div className="flex flex-col bg-dark-layer-1 relative">
        <QuestionIDENav />
        <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60,40]} minSize={60}>
            <div className="w-full">
                <Skeleton className="w-full bg-dark-fill-3 border-transparent"/>
            </div>
            
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
                    <Skeleton className="w-full overflow auto"/>
                </div>
                {/* display of test cases in / output */}
                <div className=" w-full my-4">
                    <Skeleton className="w-full rounded-lg border mb-4 p-4 bg-dark-fill-3 border-transparent"/>
                    <Skeleton className="w-full rounded-lg border p-4 bg-dark-fill-3 border-transparent"/>
                </div>
            </div>
        </Split>
        <QuestionIDEFooter  />
    </div>
    )
}