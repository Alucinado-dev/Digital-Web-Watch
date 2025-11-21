import pt from '../assets/svg/pt-br.svg'
import en from '../assets/svg/en-us.svg'

const LangToggle = () => {
  return (
    <label className='hidden  large-tablet:flex cursor-pointer p-2 justify-center items-center gap-2'>
      <span className='label-text flex justify-center items-center p-1.5 gap-1'>
        <img src={pt} className='w-8 h-8' alt='' />
        Portugês
      </span>
      <input type='checkbox' value='synthwave' className='toggle theme-controller' />
      <span className='label-text flex justify-center items-center p-1.5 gap-1'>
        English
        <img src={en} className='w-8 h-8' alt='' />
      </span>
    </label>
  )
}

export default LangToggle
