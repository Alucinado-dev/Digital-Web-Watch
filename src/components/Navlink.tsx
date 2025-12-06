import type { ComponentProps } from 'react'
import { Slot } from '@radix-ui/react-slot'

type NavbarItemProps = ComponentProps<'a'> & {
  children: React.ReactNode
  asChild?: boolean
}

const NavbarItem = ({ children, asChild = false, ...props }: NavbarItemProps) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      className='flex items-center justify-center gap-2 rounded-md border uppercase py-3 px-2 text-sm font-medium transition-colors duration-200 bg-(--navlink-box-color) border-(--navlink-box-border) shadow-(--navlink-box-shadow) hover:border-(--navlink-box-hover)  active:border-(--navlink-box-active) text-(--navlink-text-color) text-shadow-(--navlink-text-shadow) hover:text-(--navlink-text-hover) active:text-(--navlink-text-active)'
      {...props}
    >
      {children}
    </Comp>
  )
}

export default NavbarItem
