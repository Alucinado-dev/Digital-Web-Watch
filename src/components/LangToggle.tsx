import en from '../assets/img/usa-flag-seeklogo.png'
import pt from '../assets/img/bandeira-do-brasil-seeklogo.png'
import { useLanguageStore } from '../stores/languageStore'

type Language = {
  id: 'pt' | 'en'
  label: string
  icon: string
}

const languages: Record<'pt' | 'en', Language> = {
  pt: { id: 'pt', label: 'Português', icon: pt },
  en: { id: 'en', label: 'English', icon: en },
}

const LangToggle = () => {
  const { language, setLanguage } = useLanguageStore()

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLang = e.target.checked ? 'en' : 'pt'
    setLanguage(newLang)
  }

  return (
    <label className='hidden  large-tablet:flex cursor-pointer p-2 justify-center items-center gap-2'>
      <span className='label-text flex justify-center items-center p-1.5 gap-1'>
        <img src={languages.pt.icon} className='w-8 h-8' alt={`Bandeira ${languages.pt.label}`} />
        {languages.pt.label}
      </span>
      <input
        type='checkbox'
        className='toggle theme-controller'
        checked={language === 'en'}
        onChange={handleToggleChange}
      />
      <span className='label-text flex justify-center items-center p-1.5 gap-1'>
        {languages.en.label}
        <img src={languages.en.icon} className='w-8 h-8' alt={`Flag ${languages.en.label}`} />
      </span>
    </label>
  )
}

export default LangToggle
