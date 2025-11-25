import { useState } from "react";
import logo from "../assets/favicon/ALucin4do-logo.png";

type FooterProps = {
  text?: string;
  link?: string;
  brandName?: string;
} & React.HTMLAttributes<HTMLElement>;

const Footer = ({
  text = "Developed with 💜 by",
  link = "https://alucinado-dev.vercel.app",
  brandName = "</ALUCINADO-DEV>",
}: FooterProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Variáveis para controlar as cores, como você mencionou
  const brandColors = {
    logo1: "#FF00FF",
    logo2: "#00FFFF",
    logo3: "#0600ab",
    text: "#bacfdd",
  };

  // Estilos base do link
  const linkStyle: React.CSSProperties = {
    fontWeight: 900,
    color: brandColors.text,
    transition: "all 200ms ease-in-out",
  };

  // Estilos aplicados apenas no hover
  const linkHoverStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(180deg, ${brandColors.logo1} 30%, ${brandColors.logo2} 70%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text", // Para compatibilidade com navegadores Webkit (Chrome, Safari)
    color: "transparent",
    textShadow: `0px 0px 10px ${brandColors.logo3}`,
  };

  return (
    <footer className="absolute bottom-0 box-border w-full p-4">
      <div className="flex items-center justify-center gap-4 text-xl text-[#bacfdd] font-['Share_Tech_Mono',monospace]">
        <p>{text}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
          style={isHovered ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {brandName}
          <img className="h-9 w-9" src={logo} alt="Logo of ALucinado-dev" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
