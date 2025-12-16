import { ArrowBigRightDash} from "lucide-react";
import type { ButtonHTMLAttributes } from "react";


type ResetBtnProps = ButtonHTMLAttributes<HTMLButtonElement>


const ResetBtn = (props : ResetBtnProps) =>{

    return (
      <button className='btn btn-accent' {...props}>
        <ArrowBigRightDash />
      </button>
    )
}

export default ResetBtn