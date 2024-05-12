import Link from "next/link";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentFirstShow from "@/components/comments/comment-first-show";
import {paths} from "@/path";

interface PostShowPageProps {
  params: {
    slug: string;
    questionId: string;
  };
}

export default async function CommentShowPage({ params }: PostShowPageProps) {
  const { slug, questionId } = params;

  return (
    <div className="relative h-screen" style={{backgroundColor:'#191f45', height: '100%'}}>
      <Link className="" href={paths.topicShow(slug)}>
        <p className="hover:underline decoration-solid text-bold font-medium text-gray-200">{"< "}Back To {slug} Questions</p>
      </Link>
      <div className="flex gap-3 m-4">
        <p className='font-bold mr-3 text-gray-400'>Post Your Comment</p>
        <CommentCreateForm questionInfoId={questionId} />
      </div>
      <CommentList questionInfoId={questionId}  />
    </div>
  );
}
