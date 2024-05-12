'use client'

import { latestQuestionsSolved } from "@/db/queries/solvedQuestions"
import { paths } from "@/path"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, User } from "@nextui-org/react"
import moment from "moment";

interface ActivityTableProps{
    latestSolvedQuestions:latestQuestionsSolved[];
}

export default function ActivityTable({latestSolvedQuestions}:ActivityTableProps){
    const columns = [
        {name: "User", uid: "user"},
        {name: "Question", uid: "question"},
        {name: "Solved At ", uid: "solvedAt"},
    ];

    return(
        <Table aria-label="Example table with custom cells" style={{backgroundColor:'#4d547d'}}  >
            <TableHeader columns={columns} >
                {column=>(
                <TableColumn key={column.uid} align={"start"} style={{backgroundColor:'#21295c',color:"white"}}>
                {column.name}
                </TableColumn>
                )} 
            </TableHeader>
            <TableBody items={latestSolvedQuestions} style={{backgroundColor:'#4d547d'}}>
                {item => (
                <TableRow key={item?.userId}>
                    <TableCell>
                    <User
                        avatarProps={{radius: "lg", src: item?.user?.image || undefined}}
                        description={item.user.email}
                        name={item.user.name}
                    />
                    </TableCell>
                    <TableCell>
                    {item?.questionInfo.title}
                    </TableCell>
                    <TableCell>
                    <div className="relative flex items-center gap-2">
                        {moment(item.createdAt).fromNow()}
                    </div>
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
        </Table>
    )
} 