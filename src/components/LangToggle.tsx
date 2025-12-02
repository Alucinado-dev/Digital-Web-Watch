import pt from '../assets/img/bandeira-do-brasil-seeklogo.png'
import en from '../assets/img/usa-flag-seeklogo.png'
import { useLanguageStore, type Language } from '../stores/languageStore'

type LangToggleProps = React.HTMLAttributes<HTMLLabelElement>

type LangToggleTypes = {
  id: Language
  label: string
  icon: string
}

const languages: Record<'pt' | 'en', LangToggleTypes> = {
  pt: { id: 'pt-BR', label: 'Selecione a Linguagem Português do Brasil', icon: pt },
  en: { id: 'en-US', label: 'Select Language English', icon: en },
}

const LangToggle = ({ ...props }: LangToggleProps) => {
  const { language, setLanguage } = useLanguageStore()

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLang = e.target.checked ? 'en-US' : 'pt-BR'
    setLanguage(newLang)
  }

  return (
    <label {...props}>
      <span className='label-text flex justify-center items-center p-1.5 gap-1'>
        <img src={languages.pt.icon} className='w-9 h-6' alt={languages.pt.label} />
      </span>
      <input
        type='checkbox'
        className='toggle theme-controller'
        checked={language === 'en-US'}
        onChange={handleToggleChange}
      />
      <span className='label-text flex justify-center items-center p-1.5 gap-1'>
        <img src={languages.en.icon} className='w-9 h-6' alt={languages.en.label} />
      </span>
    </label>
  )
}

export default LangToggle
