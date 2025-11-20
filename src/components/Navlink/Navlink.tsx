import type { LucideIcon } from 'lucide-react'
import type { LiHTMLAttributes } from 'react'
import { Link } from 'react-router'


type NavlinkProps = React.DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  text: string
  Icon: LucideIcon
  path: string
}

const Navlink = ({ Icon, path, text, ...rest }: NavlinkProps) => {
  return (
    <li {...rest}>
      <Link
        className='flex items-center justify-center gap-2 py-3 px-2 bg-[var(--navlink-box-color)] border-[var(--navlink-box-border)] shadow-[var(--navlink-box-shadow)] hover:bg-[var(--navlink-box-hover)] active:bg-[var(--navlink-box-active)] visited:bg-[var(--navlink-box-visited)]  text-[var(--navlink-text-color)] text-shadow-[var(--navlink-text-shadow)] hover:text-[var(--navlink-text-hover)] active:text-[var(--navlink-text-active)] visited:text-[var(--navlink-text-visited)]'
        to={path}
      >
        <Icon size={24} />
        <span className='text-(family-name:var(--navlink-font)'>{text}</span>
      </Link>
    </li>
  )
}

export default Navlink
