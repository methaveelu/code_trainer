'use client'

import { createTopic } from "@/actions";
import {Popover, PopoverTrigger, PopoverContent, Button, Input, Textarea} from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../FormButton";
// import Loader from "../Loader";

export default function TopicCreateForm() {

    const [formState, action] = useFormState(createTopic, {errors:{}})
      return (
        <>
         <Popover
              showArrow
              offset={10}
              placement="left"
              backdrop="blur"
        >
              <PopoverTrigger>
                <Button color="warning" variant="flat" className="capitalize">
                  Create Topic
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[340px]">
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                    <p className="text-small font-bold text-foreground">
                        Create Topic
                    </p>
                    <Input
                        name="name" label="Coding Language"
                        labelPlacement="outside" placeholder="language"
                        isInvalid={!!formState.errors.name}
                        errorMessage={formState.errors.name?.join(',')}
                    />
                    <Textarea
                        name="description" label="Description"
                        labelPlacement="outside" placeholder="Description" 
                        isInvalid={!!formState.errors.description}
                        errorMessage={formState.errors.description?.join(', ')}
                    />
                    {formState.errors._form?.join(',')}
                    <FormButton>Create</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
        </>
      )
}


