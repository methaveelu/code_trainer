import { Button } from "@nextui-org/react"
import { useFormStatus } from "react-dom"

interface FormButtonProps  {
    children:React.ReactNode
}
export default function FormButton({children}: FormButtonProps) {
    const {pending} = useFormStatus();
    return (
    <Button type="submit" color='primary' isLoading={pending} >
        {children}
    </Button>
  )
}

