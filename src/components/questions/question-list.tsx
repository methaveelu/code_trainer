// "use server"
'use client';

import { QuestionInfoData } from "@/db/queries/questionsInfo"
import { paths } from "@/path";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue} from "@nextui-org/react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { AiFillCode } from "react-icons/ai";

interface QuestionListProps {
  questions: QuestionInfoData[];
}

export default  function QuestionList({questions}: QuestionListProps) {
  
  // const questions = await fetchData();
  
  // const renderQuestions = questions.map(question =>{
    // const topicSlug = question?.topic?.slug

    // if (!topicSlug) {
    //   throw new Error('Need a slug to link to a post');
    // }

    const columns = [
      {name: "QUESTION", uid: "question"},
      {name: "Created By", uid: "createdby"},
      {name: "Difficulty", uid: "difficulty"},
      {name: "ACTIONS", uid: "actions"},
    ];

    return (
      <Table aria-label="Example table with custom cells " style={{backgroundColor:'rgb(40,40,40)', }}  >
      <TableHeader columns={columns}  >
        {column=>(
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"} style={{backgroundColor: 'rgb(26,26,26)'}}>
          {column.name}
        </TableColumn>
        )} 
      </TableHeader>
      <TableBody items={questions}>
        {item => (
          <TableRow key={item?.id}>
            <TableCell><div className="text-bold text-sm capitalize">{item?.title}</div></TableCell>
            <TableCell>
              <User
                avatarProps={{radius: "lg", src: item?.user?.image || undefined}}
                description={item.user.email}
                name={item.user.name}
              />
            </TableCell>
            <TableCell>
              <Chip className="capitalize" color={`${item?.difficulty}` === 'easy'? 'success': `${item?.difficulty}` === 'medium'? 'warning': 'danger' } size="sm" variant="flat">
              {item?.difficulty}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="relative flex items-center gap-5">
                  <Link href={paths.postShow(item?.topic?.slug, item?.id)} prefetch={true} >
                  <Tooltip content="Comments" color="secondary">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <BiSolidCommentDetail fontSize={30}/>                 
                    </span>
                  </Tooltip>
                  </Link>

                  <Link href={paths.questionShow(item?.topic?.slug, item?.id)} prefetch={true}>
                  <Tooltip content="Attempt Question"  color="secondary">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">                   
                      <AiFillCode fontSize={30}/>                   
                    </span>
                  </Tooltip>
                  </Link>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      </Table>
    )
}
  // })
  
  // return <div className="space-y-2">{renderQuestions}</div>


 {/* <div key={question?.id} className="border rounded p-2 ">
        
          <h3 className="text-lg font bold ">{question?.title}</h3>
            <div className="flex flex-row gap-8 justify-end">
              <p className="text-xs text-gray-600">By {question?.user?.name}</p>
              <p className="text-xs text-gray-600"> {question?._count?.comments} Comments</p>
              
                <Button  variant="bordered">Comment</Button>
              
              
                <Button variant="bordered">Attempt</Button>
              </Link>
            </div>
      </div> */}
    