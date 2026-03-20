// Variante compartilhada por todos os filhos do PageWrapper

import type { Variants } from 'motion/react';

// Exportada para ser usada individualmente nos componentes internos
export const pageItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94], // ease-out cubic customizado — mais refinado que 'easeOut'
    },
  },
}
