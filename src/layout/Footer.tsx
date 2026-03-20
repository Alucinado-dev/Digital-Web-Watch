import { motion } from 'motion/react'
import logo from '../assets/favicon/ALucin4do-logo.png'

type FooterProps = {
  text?: string
  link?: string
  brandName?: string
} & React.HTMLAttributes<HTMLElement>

const Footer = ({
  text = 'Developed with 💜 by',
  link = 'https://alucinado-dev.vercel.app',
  brandName = '</ALUCINADO-DEV>',
}: FooterProps) => {
  const brandColors = {
    logo1: '#FF00FF',
    logo2: '#00FFFF',
    logo3: '#0600ab',
    text: '#bacfdd',
  }

  return (
    <motion.footer
      className='box-border w-full p-4'
      // Entra de baixo espelhando o header — cria simetria na entrada da página
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25,
        delay: 0.15, // entra depois do header e do conteúdo principal
      }}
    >
      <div className="flex items-center justify-center gap-4 text-[8px] mobile:text-xs small-tablet:text-xl text-[#bacfdd] font-['Share_Tech_Mono',monospace]">
        <p>{text}</p>

        <motion.a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center justify-center gap-2'
          style={{ fontWeight: 900, color: brandColors.text }}
          // whileHover substitui o useState de isHovered — mais limpo
          // e o Motion interpola entre os valores automaticamente
          whileHover={{
            backgroundImage: `linear-gradient(180deg, ${brandColors.logo1} 30%, ${brandColors.logo2} 70%)`,
            // backgroundClip não é animável pelo Motion, fazemos via CSS var
          }}
          transition={{ duration: 0.2 }}
        >
          {/* O gradiente no texto precisa de CSS porque backgroundClip
              não é suportado como propriedade animável pelo Motion.
              Usamos um span com className condicional via group-hover */}
          <span
            className='footer-brand-text'
            style={{
              fontWeight: 900,
              color: brandColors.text,
              transition: 'all 200ms ease-in-out',
            }}
          >
            {brandName}
          </span>
          <motion.img
            className='h-9 w-9'
            src={logo}
            alt='Logo of ALucinado-dev'
            // O logo gira levemente no hover — detalhe premium
            whileHover={{ rotate: 15, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          />
        </motion.a>
      </div>

      {/* Mantemos o hover do texto via CSS puro porque backgroundClip
          não funciona com Motion — mas o comportamento é o mesmo */}
      <style>{`
        .footer-brand-text {
          background-size: 0% 100%;
          background-repeat: no-repeat;
        }
        a:hover .footer-brand-text {
          background-image: linear-gradient(180deg, ${brandColors.logo1} 30%, ${brandColors.logo2} 70%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0px 0px 10px ${brandColors.logo3};
        }
      `}</style>
    </motion.footer>
  )
}

export default Footer
