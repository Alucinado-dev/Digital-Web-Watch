import { FlagTriangleRight, NotebookPen, Timer } from 'lucide-react'

import Navlink from '../Navlink/Navlink'

const Navbar = () => {


  return (
    <nav>
      <ul className='flex justify-center items-center gap-7 py-3 px-5 flex-nowrap'>
        <Navlink Icon={Timer} path='/timer' text='crônometro'/>
        <Navlink Icon={NotebookPen} path='/pomodoro' text='pomodoro'/>
        <Navlink Icon={FlagTriangleRight} path='/timer' text='temporizador'/>
      </ul>
    </nav>
  )
}

export default Navbar
