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
      <button
        className='btn btn-outline rounded-2xl text-2xl h-auto  flex justify-center items-center gap-2 py-4 px-5'
        disabled={isDisabled}
        aria-disabled={isDisabled}
        type='submit'
        title={text}
        {...rest}
      >
        {isDisabled ? (
          <>
            <span className='loading loading-spinner'></span>
            <span> {t('submitBtn.loading')} </span>
          </>
        ) : (
          <>
            <Icon size={28} />
            <span> {text} </span>
          </>
        )}
      </button>
    )
}

export default SubmitBtn