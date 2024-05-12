// import { fetch1stComment } from "@/db/queries/comments"
// import type { CommentWithAuthor } from "@/db/queries/comments"
import Image from "next/image";

interface CommentFirstShowProp{
    title1stComment: string | undefined;
    content1stComment: string | undefined;
    image1stComment: string | null;
    
}
export default async function CommentFirstShow({title1stComment,content1stComment, image1stComment }:CommentFirstShowProp) {
    return (
        <div className="m-4">
            <div className="flex gap-3 m-4">
                <Image
                    src={image1stComment || ''}
                    alt="user image"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                />
                <h1 className='text 2xl font-bold my-2  text-gray-200'>{title1stComment}</h1>
            </div>
            <p className='p-4 border rounded  text-gray-200'>{content1stComment}</p>
        </div>
      )
  
}
