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
        <ul className='flex items-center gap-9 px-1'>
          {allNavLinks.map(({ path, Icon, textKey }, index) => {
            const isActive = location.pathname === path

            return (
              <motion.li
                key={path}
                // position relative é o contexto para a pill absoluta
                style={{ position: 'relative', listStyle: 'none' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + index * 0.07,
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                }}
              >
                {/* Pill deslizante — layoutId é o que faz a mágica:
                    o Motion encontra todos os elementos com o mesmo layoutId
                    e anima a transição de posição/tamanho entre eles.
                    A pill "viaja" de um li para outro automaticamente. */}
                {isActive && (
                  <motion.span
                    layoutId='nav-pill'
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '10px',
                      background: 'var(--navlink-pill-bg, rgba(255,255,255,0.1))',
                      border: '1px solid var(--navlink-pill-border, rgba(255,255,255,0.15))',
                      zIndex: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                <NavLink
                  to={path}
                  title={textKey}
                  aria-label={textKey}
                  style={{ position: 'relative', zIndex: 1 }} // fica acima da pill
                >
                  <NavbarItem asChild>
                    {/* div interno para não perder os estilos do NavbarItem */}
                    <div className='flex items-center gap-2 px-4 py-2 cursor-pointer'>
                      {/* Ícone — wiggle só quando ativo, parado quando inativo */}
                      <motion.span
                        animate={
                          isActive ?
                            {
                              // rotate oscila entre -12° e +12° infinitamente
                              // repeat: Infinity com repeatType 'mirror' inverte a direção
                              rotate: [-12, 12, -12],
                              transition: {
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: 'mirror' as const,
                                ease: 'easeInOut',
                                // repeatDelay pausa entre cada wiggle completo
                                // sem isso fica nervoso demais
                                repeatDelay: 1.2,
                              },
                            }
                          : { rotate: 0 }
                        }
                        style={{ display: 'inline-flex', transformOrigin: 'center bottom' }}
                      >
                        <Icon size={20} />
                      </motion.span>

                      <span className='text-sm font-medium uppercase tracking-wide'>{textKey}</span>
                    </div>
                  </NavbarItem>
                </NavLink>
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
