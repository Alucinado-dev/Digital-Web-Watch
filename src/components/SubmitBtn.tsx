import { type LucideIcon } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"
import { useTranslation } from "react-i18next"


type SubmitBtnProps = {
    Icon: LucideIcon
    text: string
    isDisabled: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const SubmitBtn = ({Icon, isDisabled, text , ...rest}: SubmitBtnProps) => {

    const { t }= useTranslation()

    return (
      <button className='btn flex justify-center items-center gap-2 py-1.5 px-2.5' disabled={isDisabled} aria-disabled={isDisabled}  {...rest}>
        {isDisabled ? (
          <>
            <span className='loading loading-spinner'></span>
            <span> {t('submitBtn.loading')} </span>
          </>
        ) : (
          <>
            <Icon size={32} />
            <span> {text} </span>
          </>
        )}
      </button>
    )
}

export default SubmitBtn