import { useTranslation } from 'react-i18next'
import { useThemeStore, type Themes } from '../stores/themeStore'


type ThemeToggleTypes = {
  label: string
  value: Themes
}

const themes: ThemeToggleTypes[] = [
  {label : 'Neon Dreams', value: 'neon-dreams'},
  {label: 'Deep Ocean', value: 'deep-ocean'},
  {label: 'Sakura Blossom', value: 'sakura-blossom'},
  {label: 'Mint Leaves', value: 'mint-leaves'},
  {label: 'Dune Glow', value: 'dune-glow'},
  {label: 'Overcast', value: 'overcast'}
]
const ThemeToggle = () => {
  const { theme, setTheme } = useThemeStore()

  const handleThemeChange = (newTheme: Themes) => {
    setTheme(newTheme)
  }

  const { t } = useTranslation()
  return (
    <div className='dropdown  '>
      <div tabIndex={0} role='button' className='btn m-1'>
        {t('theme')}
        <svg
          width='12px'
          height='12px'
          className='inline-block h-2 w-2 fill-current opacity-60'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 2048 2048'
        >
          <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'> </path>
        </svg>
      </div>
      <ul
        tabIndex={-1}
        className='dropdown-content absolute right-0 bg-base-300 rounded-box z-50 w-52 p-2 shadow-2xl'
      >
        {themes.map(({ label, value }) => (
          <li key={value}>
            <input
              type='radio'
              name='theme-dropdown'
              className='theme-controller w-full btn btn-sm btn-block btn-ghost justify-start'
              checked={theme === value}
              aria-label={label}
              value={value}
              onChange={() => handleThemeChange(value)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeToggle
