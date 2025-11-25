import type { WorkflowVariant } from "./CycleDot"
import CycleDot from "./CycleDot"



const Cycles = () => {

    const recentWorkFlow : WorkflowVariant[] = [
        "workTime",
        "shortBreak",
        "workTime",
        "shortBreak",
        "workTime",
        "longBreak"
    ]

    return(
        <div className="flex gap-1.5 items-center justify-center ">
            {recentWorkFlow.map((variant, index) => (
                <CycleDot key={index} variant={variant} />
            ))}
        </div>
    )
}

export default Cycles