import { TimerReset } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";


type ResetBtnProps = ButtonHTMLAttributes<HTMLButtonElement>


const NextBtn = (props : ResetBtnProps) =>{

    return(
        <button className="btn btn-warning" {...props}>
            <TimerReset />
        </button>
    )
}

export default NextBtn