import { fetchCommentsByQuestionId } from "@/db/queries/comments";
import CommentShow from "./comment-show";
import CommentFirstShow from "./comment-first-show";

interface CommentListProps {
  questionInfoId: string;
}

export default async function CommentList({ questionInfoId }: CommentListProps) {
  const comments = await fetchCommentsByQuestionId(questionInfoId);
  const parentLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const firstComment = comments[0]; // Moved this outside the map function

  const renderComments = parentLevelComments.map(comment => (
    <CommentShow
      key={comment.id}
      commentId={comment.id}
      questionInfoId={questionInfoId}
      firstComment={firstComment}
      allComments={comments}
    />
  ));

  return (
    <div className="space-y-3 h-screen m-6">
      {comments.length > 1 && <h1 className="text-lg font-bold  text-gray-400">All {comments.length} comments</h1>}
      {firstComment && (
        <CommentFirstShow
          title1stComment={firstComment.title}
          content1stComment={firstComment.content}
          image1stComment={firstComment.user.image}
        />
      )}
      {renderComments}
    </div>
  );
}
