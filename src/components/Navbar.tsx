import { FlagTriangleRight, NotebookPen, Timer, type LucideIcon } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import LangToggle from './LangToggle'
import Logo from './Logo'
import Navlink from './Navlink'
import ThemeToggle from './ThemeToggle'

// Apenas para referência de tipo
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ptTranslation = { nav: { timer: '', pomodoro: '', stopwatch: '' } }

type allNavLinksTypes = {
  path: string
  Icon: LucideIcon
  textKey: keyof (typeof ptTranslation)['nav']
}

const allNavLinks: allNavLinksTypes[] = [
  { path: '/timer', Icon: Timer, textKey: 'timer' },
  { path: '/pomodoro', Icon: NotebookPen, textKey: 'pomodoro' },
  { path: '/stopwatch', Icon: FlagTriangleRight, textKey: 'stopwatch' },
]

const Navbar = () => {
  const { t } = useTranslation()
  return (
    <nav className='navbar w-full'>
      <div className='navbar-start small-tablet:min-w-[420px]'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {' '}
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />{' '}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            style={{ gap: '12px' }}
          >
            {allNavLinks.map(({ path, Icon, textKey }) => (
              <li key={path}>
                <Navlink asChild key={path}>
                  <Link to={path}>
                    <Icon size={24} />
                    <span>{t(`nav.${textKey}`)}</span>
                  </Link>
                </Navlink>
              </li>
            ))}

            <li className='large-tablet:hidden flex justify-center items-center'>
              <Navlink asChild key='lang'>
                <LangToggle className='flex cursor-pointer p-2 justify-center items-center gap-2 ' />
              </Navlink>
            </li>
          </ul>
        </div>
        <a className='hidden  small-tablet:flex'>
          <Logo size={48} />
        </a>
      </div>

      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {allNavLinks.map(({ path, Icon, textKey }) => (
            <li key={path}>
              <Navlink asChild key={path}>
                <Link to={path}>
                  <Icon size={24} />
                  <span>{t(`nav.${textKey}`)}</span>
                </Link>
              </Navlink>
            </li>
          ))}
        </ul>
      </div>
      <div className='navbar-end flex flex-col-reverse items-end justify-center md:justify-end md:items-center md:flex-row'>
        <LangToggle className='hidden  large-tablet:flex cursor-pointer p-2 justify-center items-center gap-2' />
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar
