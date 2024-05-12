import { Skeleton } from "@nextui-org/react"

export default function LoaderIDETestcase (){
    return (
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
                    <Skeleton className="w-full rounded-lg border px-3 py-2 bg-dark-fill-3 border-transparent"/>
                    <Skeleton className="w-full rounded-lg border px-3 py-2 bg-dark-fill-3 border-transparent"/>
                </div>
        </div>
    )
}