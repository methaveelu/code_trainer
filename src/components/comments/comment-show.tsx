

import CommentCreateForm from '@/components/comments/comment-create-form';
import Image from 'next/image';


interface CommentShowProps {
  questionInfoId: string;
  commentId?: string;
  allComments?: any;
  firstComment?: any;
}

export default async function CommentShow({ questionInfoId, commentId, allComments, firstComment }: CommentShowProps) {
//   const allComments = await fetchCommentsByQuestionId(questionInfoId);

  const otherComments = allComments?.slice(1);
  const parentComments = otherComments?.find((p:any) => p.id === commentId);
  const childrenComments = otherComments?.filter((child:any) => child.parentId === commentId);
  const renderChildren = childrenComments?.map((child:any) => {
    return <CommentShow key={child.id} commentId={child.id} questionInfoId={questionInfoId}
    allComments={allComments} />;
  });

  return (
    <div className="p-4 border m-3">
      {parentComments && (
        <div className="flex gap-3 m-4">
          <Image
            src={parentComments.user.image || ''}
            alt="user image"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 space-y-3">
            <p className="text-sm font-medium text-gray-100">{parentComments.user.name}</p>
            <p className="text-gray-200">{parentComments.content}</p>
            <CommentCreateForm questionInfoId={questionInfoId} parentId={parentComments.id} />
          </div>
        </div>
      )}
      {renderChildren ?(
        <div className="pl-4">{renderChildren}</div>
      ):null}
    </div>
  );
}
