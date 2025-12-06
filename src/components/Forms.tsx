import { Paperclip } from "lucide-react"
import Input from "./input"
import SubmitBtn from "./SubmitBtn"
import { useForm } from "react-hook-form"


const Forms = () => {
    const {register, handleSubmit} = useForm()
    
    const onSubmit = data => console.log('data :>> ', data);
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input label='nome da tarefa' />
            <SubmitBtn Icon={Paperclip} isDisabled={false} text='Enviar' />
        </form>
    )
}

export default Forms