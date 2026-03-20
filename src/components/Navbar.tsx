import { FlagTriangleRight, Menu, NotebookPen, Timer, X, type LucideIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation } from 'react-router-dom'
import LangToggle from '../features/LangToggle'
import ThemeToggle from '../features/ThemeToggle'
import NavbarItem from './Navlink'

type NavLinkType = {
  path: string
  Icon: LucideIcon
  textKey: string
}

// Variantes do container do dropdown — controla o clip de altura
// O staggerChildren faz os itens entrarem em sequência
const dropdownVariants = {
  closed: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    transition: {
      duration: 0.18,
      ease: 'easeIn' as const,
      // staggerChildren na saída — itens saem em ordem reversa
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: 'easeOut' as const,
      // Cada item entra com 50ms de delay em relação ao anterior
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Variantes de cada item do dropdown
const dropdownItemVariants = {
  closed: { opacity: 0, x: -12 },
  open: { opacity: 1, x: 0, transition: { ease: 'easeOut' as const } },
}

const Navbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const allNavLinks: NavLinkType[] = [
    { path: '/', Icon: NotebookPen, textKey: t('nav.pomodoro') },
    { path: '/timer', Icon: Timer, textKey: t('nav.timer') },
    { path: '/stopwatch', Icon: FlagTriangleRight, textKey: t('nav.stopwatch') },
  ]

  const closeMobile = () => setMobileOpen(false)

  return (
    <nav className='navbar w-full'>
      {/* ── MOBILE: hamburger + dropdown ── */}
      <div className='navbar-start'>
        <div className='relative lg:hidden'>
          {/* Botão hamburguer — ícone anima entre Menu e X */}
          <motion.button
            className='btn btn-ghost'
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode='wait' initial={false}>
              {mobileOpen ?
                <motion.span
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              : <motion.span
                  key='open'
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              }
            </AnimatePresence>
          </motion.button>

          {/* Dropdown — AnimatePresence com estado controlado
              Isso é crucial: sem o estado booleano, o exit nunca dispara
              porque o componente é desmontado antes da animação terminar */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.ul
                variants={dropdownVariants}
                initial='closed'
                animate='open'
                exit='closed'
                tabIndex={-1}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow absolute left-0 top-full'
                style={{ gap: '8px', originX: 0, originY: 0 }}
              >
                {allNavLinks.map(({ path, Icon, textKey }) => (
                  <motion.li key={path} variants={dropdownItemVariants}>
                    <NavbarItem asChild>
                      <NavLink to={path} title={textKey} aria-label={textKey} onClick={closeMobile}>
                        <Icon size={24} />
                        <span>{textKey}</span>
                      </NavLink>
                    </NavbarItem>
                  </motion.li>
                ))}

                <motion.li
                  variants={dropdownItemVariants}
                  className='large-tablet:hidden flex justify-center items-center'
                >
                  <NavbarItem asChild>
                    <LangToggle className='flex cursor-pointer p-2 justify-center items-center gap-2' />
                  </NavbarItem>
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <LangToggle className='hidden large-tablet:flex cursor-pointer p-2 justify-center items-center gap-2' />
      </div>

      {/* ── DESKTOP: links centrais ── */}
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal gap-7 px-1'>
          {allNavLinks.map(({ path, Icon, textKey }, index) => {
            const isActive = location.pathname === path

            return (
              // O container do li precisa de position relative para o indicador absoluto
              <motion.li
                key={path}
                style={{ position: 'relative' }}
                // Stagger na entrada inicial — cada link entra com delay progressivo
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + index * 0.07,
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                }}
              >
                <NavbarItem asChild>
                  <NavLink to={path} title={textKey} aria-label={textKey}>
                    <Icon size={24} />
                    <span>{textKey}</span>
                  </NavLink>
                </NavbarItem>

                {/* Indicador ativo — layoutId faz o Motion identificar
                    esse elemento em todos os links e animar a transição
                    da barrinha de um link para outro automaticamente.
                    É a animação mais elegante da lib com menos código. */}
                {isActive && (
                  <motion.span
                    layoutId='nav-active-indicator'
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: '15%',
                      right: '15%',
                      height: 2,
                      borderRadius: 1,
                      background: 'var(--navlink-text-color, currentColor)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </motion.li>
            )
          })}
        </ul>
      </div>

      {/* ── DESKTOP: end ── */}
      <div className='navbar-end flex flex-col-reverse items-end justify-center md:justify-end md:items-center md:flex-row'>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar
