import { FlagTriangleRight, NotebookPen, Timer, type LucideIcon } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { NavLink } from 'react-router-dom'
import LangToggle from '../features/LangToggle'
import ThemeToggle from '../features/ThemeToggle'
import NavbarItem from './Navlink'

type allNavLinksTypes = {
  path: string
  Icon: LucideIcon
  textKey: string
}

const Navbar = () => {
  const { t } = useTranslation()

  const allNavLinks: allNavLinksTypes[] = [
    { path: '/', Icon: NotebookPen, textKey: t('nav.pomodoro') },
    { path: '/timer', Icon: Timer, textKey: t('nav.timer') },
    { path: '/stopwatch', Icon: FlagTriangleRight, textKey: t('nav.stopwatch') },
  ]

  return (
    <nav className='navbar w-full'>
      <div className='navbar-start '>
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
            className='menu menu-sm dropdown-content gap-4 bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            style={{ gap: '12px' }}
          >
            {allNavLinks.map(({ path, Icon, textKey }) => (
              <li key={path}>
                <NavbarItem asChild key={path}>
                  <NavLink to={path} title={textKey} aria-label={textKey}>
                    <Icon size={24} />
                    <span>{textKey}</span>
                  </NavLink>
                </NavbarItem>
              </li>
            ))}

            <li className='large-tablet:hidden flex justify-center items-center'>
              <NavbarItem asChild key='lang'>
                <LangToggle className='flex cursor-pointer p-2 justify-center items-center gap-2 ' />
              </NavbarItem>
            </li>
          </ul>
        </div>
        <LangToggle className='hidden  large-tablet:flex cursor-pointer p-2 justify-center items-center gap-2' />
      </div>

      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal gap-7 px-1'>
          {allNavLinks.map(({ path, Icon, textKey }) => (
            <li key={path}>
              <NavbarItem asChild key={path}>
                <NavLink to={path} title={textKey} aria-label={textKey}>
                  <Icon size={24} />
                  <span>{textKey}</span>
                </NavLink>
              </NavbarItem>
            </li>
          ))}
        </ul>
      </div>
      <div className='navbar-end flex flex-col-reverse items-end justify-center md:justify-end md:items-center md:flex-row'>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar
