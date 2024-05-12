'use client'

import { useFormState } from 'react-dom'
import FormButton from '../FormButton'
import * as actions from '../../actions'
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Textarea } from '@nextui-org/react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface QuestionCreateFormProps{
    slug: string
}

export default  function QuestionCreateForm({slug}:QuestionCreateFormProps) {
  const[formState, action] = useFormState(actions.createQuestion.bind(null,slug), {errors:{}});
  useEffect(() => {
    if(formState?.success){
      toast.success('',{position: 'top-center', autoClose:3000})
    }
  },[formState])

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>create question</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-[450px]">
            <h3 className="text-lg">Create Question</h3>
            <Input
              type='text'
              name='title'
              label='Title'
              labelPlacement='outside'
              placeholder='Question Title'
              isInvalid={!!formState?.errors?.title}
              errorMessage={formState?.errors?.title?.join(', ')}
            />
            <Input
              type='text'
              name='category'
              label='Category'
              labelPlacement='outside'
              placeholder='Category'
              isInvalid={!!formState?.errors?.category}
              errorMessage={formState?.errors?.category?.join(', ')}
            />
            <Input
              type='text'
              name='difficulty'
              label='Difficulty'
              labelPlacement='outside'
              placeholder='Difficulty'
              isInvalid={!!formState?.errors?.difficulty}
              errorMessage={formState?.errors?.difficulty?.join(', ')}
            />
            <Input
              type='text'
              name='link'
              label='Video Tutorial Link'
              labelPlacement='outside'
              placeholder='Enter URL Here'
              isInvalid={!!formState?.errors?.link}
              errorMessage={formState?.errors?.link?.join(', ')}
            />
            <Textarea
              name='problemStatement'
              label='Problem Statement'
              labelPlacement='outside'
              placeholder='Enter Question'
              isInvalid={!!formState?.errors?.problemStatement}
              errorMessage={formState?.errors?.problemStatement?.join(', ')}
            />
            <Textarea
              name='constraints'
              label='Constraints'
              labelPlacement='outside'
              placeholder='enter HTML format'
              isInvalid={!!formState?.errors?.constraints}
              errorMessage={formState?.errors?.constraints?.join(', ')}
            />
            <Textarea
              name='starterCode'
              label='Starter Code'
              labelPlacement='outside'
              placeholder='Enter starter Code'
              isInvalid={!!formState?.errors?.starterCode}
              errorMessage={formState?.errors?.starterCode?.join(', ')}
            />
            <Textarea
              name='handlerFunction'
              label='Handler Function'
              labelPlacement='outside'
              placeholder='Handler Function'
              isInvalid={!!formState?.errors?.handlerFunction}
              errorMessage={formState?.errors?.handlerFunction?.join(', ')}
            />
            <Textarea
              name='starterFunctionName'
              label='Starter Function'
              labelPlacement='outside'
              placeholder='Starter Function'
              isInvalid={!!formState?.errors?.starterFunctionName}
              errorMessage={formState?.errors?.starterFunctionName?.join(', ')}
            />
            <Textarea
              name='examples'
              label='examples'
              labelPlacement='outside'
              placeholder='Examples JSON format'
              isInvalid={!!formState?.errors?.starterFunctionName}
              errorMessage={formState?.errors?.starterFunctionName?.join(', ')}
            />
            {
              formState?.errors?._form?
                  (<div className="bg-red-400">{formState?.errors?._form?.join(',')}</div>)
                  :(null)
            }
            <FormButton>
              Save
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
