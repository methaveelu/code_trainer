import { prisma } from "@/db/index"
import { paths } from "@/path"
import Link from "next/link";
import { Chip } from "@nextui-org/react";


export default async function TopicList() {
  const topics = await prisma.topic.findMany();

  const renderTopics = topics.map(topic =>{
    return (
      <div key={topic.id} >
        <Link prefetch={true} href={paths.topicShow(topic.slug)}>
          <Chip color='warning' variant="shadow">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    )
  })
  return <div className="flex flex-row flex-wrap gap-2">
    {renderTopics}
  </div>
  
}

