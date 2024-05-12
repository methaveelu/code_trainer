import { Skeleton } from "@nextui-org/react"

export default function LoaderIDELeft() {
  return (
    <div className='bg-dark-layer-1'>
			{/* TAB */}
      	<Skeleton className="h-11 w-full bg-dark-fill-3 border-transparent"/>
			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='w-full'>
					{/* Problem heading */}
					<div className='w-full p-4'>
						{/* problem title */}
            			<Skeleton className='flex space-x-4 bg-dark-fill-3 border-transparent'/>
						<div className='flex items-center m-3'>
							<Skeleton className = "w-14 h-8 inline-block rounded-[15px] px-2.5 py-1 bg-dark-fill-3 border-transparent"/>
							<Skeleton className='w-14 h-8 space-x-1 rounded p-[3px]  ml-4  bg-dark-fill-3 border-transparent'/>
							<Skeleton className='w-14 h-8 rounded p-[3px]  ml-4  bg-dark-fill-3 border-transparent'/>	
						</div>
						{/* Problem Statement(paragraphs) */}
						<Skeleton className="w-full h-[100px] mb-4 rounded bg-dark-fill-3 border-transparent "/>

						{/* Examples */}
						<Skeleton className='w-full h-[300px] rounded bg-dark-fill-3 border-transparent'/>

						{/* Constraints */}
						<div className='my-8 pb-4'>
              				<Skeleton className='w-full h-[80px] my-8 pb-4 rounded bg-dark-fill-3 border-transparent' />
						</div>
					</div>
				</div>
			</div>
	</div>
  )
   
}

