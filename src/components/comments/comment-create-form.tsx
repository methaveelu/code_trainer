'use client'

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import * as actions from '@/actions'
import { Textarea,Button, Input, Popover, PopoverTrigger,PopoverContent,} from "@nextui-org/react";
import FormButton from "@/components/FormButton";
import { toast } from "react-toastify";

interface CommentCreateFormPage{
    questionInfoId: string;
    parentId?: string;
    formOpen?: boolean;
}

export default function CommentCreateForm({questionInfoId,parentId,formOpen}:CommentCreateFormPage) {
    const [open, setOpen]= useState(formOpen);
    const [formState, action] = useFormState(actions.createComment.bind(null, {questionInfoId,parentId}), {errors:{}})
    const ref = useRef<HTMLFormElement|null>(null);

    useEffect(()=>{
        if(formState.success){
            toast.success("Comment created successfully!", {position:'top-center', autoClose:3000})
            ref.current?.reset();
        }if(!formOpen){
            setOpen(false);
        }
    },[formState, formOpen])

    const form = (
        <form action={action} ref={ref}>
            <div className="space-y-2 px-1 border">
                <Input
                    name="title"
                    label="Title"
                    labelPlacement="outside"
                    placeholder="Enter Title"
                    isInvalid={!!formState?.errors?.title}
                    errorMessage={formState?.errors?.title?.join(', ')}
                />
                <Textarea
                    name="content"
                    label="reply"
                    labelPlacement="outside"
                    placeholder="Enter your comment..."
                    isInvalid={!!formState?.errors?.content}
                    errorMessage={formState?.errors?.content?.join(', ')}
                />
                {formState.errors._form?(
                    <div className="bg-red-200 border rounded border-red-400">
                        {formState?.errors?._form?.join(', ')}
                    </div>
                ):null}
    
                <FormButton>Create Comment</FormButton>
            </div>
        </form>
    )
  return (
    <div>
        {/* <Button variant="bordered" size="sm" onClick={()=>setOpen(!open)}>
          <p className=" text-gray-400">Comment </p>  
        </Button>
        {open && form} */}

        <Popover>
                <PopoverTrigger>
                    <Button variant="bordered" size="sm" onClick={()=>setOpen(!open)}>
                    <p className=" text-gray-400">Comment </p>  
                    </Button>
                </PopoverTrigger>

                <PopoverContent>
                {form}
                </PopoverContent>
          </Popover>
    </div>
  )
}

