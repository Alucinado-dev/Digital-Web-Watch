
# Digital Web Watch

> Pomodoro, Timer e Cronômetro online — minha evolução de vanilla JS para React moderno.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite)](https://vitejs.dev)

**[🚀 Demo ao vivo](https://digital-web-watch.vercel.app)** · **[📦 Repositório](https://github.com/Alucinado-dev/Digital-Web-Watch)** · **[🕰️ Versão anterior (Vanilla JS)](https://github.com/Alucinado-dev/Digital-Web-Watch)**

---

## O que é

Digital Web Watch é um app de produtividade com três modos:

- **Pomodoro** — ciclos de foco e pausa configuráveis, com linha do tempo de ciclos e alertas sonoros
- **Timer** — contagem regressiva com duração personalizável
- **Cronômetro** — contagem progressiva com registro de voltas, melhor e pior volta destacados

Este projeto é uma reescrita completa da [versão anterior em Vanilla JS](https://github.com/Alucinado-dev/Digital-Web-Watch), feita como estudo de consolidação de React, TypeScript e ecossistema moderno de frontend.

---

## Visual

![Digital Web Watch - Interface com os três modos: Pomodoro, Timer e Cronômetro](/public/screenshot.jpeg)

---

## Funcionalidades

- 3 modos de timer num app só — Pomodoro, Timer e Cronômetro
- 6 temas visuais completos — Neon Dreams, Deep Ocean, Sakura Blossom, Mint Leaves, Dune Glow, Overcast
- Background animado com paralaxe baseado no movimento do mouse
- Meteoros, beams e estrelas gerados em canvas — tudo em CSS variables por tema
- Transições de página com slide direcional e animações de entrada com blur
- Alerta sonoro ao finalizar com controle de volume inline
- Configurações persistidas em localStorage
- Suporte a PT-BR e EN-US
- PWA instalável

---

## Tecnologias

| Tecnologia | Por quê |
|---|---|
| **React 19** + **TypeScript** | Base do projeto — tipagem forte evitou vários bugs durante o desenvolvimento |
| **Vite 7** | Build rápido, HMR instantâneo |
| **Zustand** | Gerenciamento de estado simples e sem boilerplate — stores separadas para Pomodoro, Timer, Stopwatch e Settings |
| **Motion** (ex Framer Motion) | Animações de página, micro-interações nos botões, paralaxe dos blobs |
| **Tailwind CSS v4** + **DaisyUI** | Estilização com sistema de temas via `data-theme` e CSS variables |
| **Howler.js** | Reprodução do alerta sonoro com controle de volume global, Sound Effect by <a href="https://pixabay.com/users/alexis_gaming_cam-50011695/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=342934">ALEXIS_GAMING_CAM</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=342934">Pixabay</a> |
| **React Router v7** | Navegação entre as páginas |
| **react-i18next** | Internacionalização PT-BR / EN-US |
| **Canvas API** | Background animado — grid, beams, meteoros e estrelas desenhados frame a frame |

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
# 1. Clone o repositório
git clone https://github.com/Alucinado-dev/Digital-Web-Watch.git
cd Digital-Web-Watch

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev
```

O app abre em `http://localhost:3000`.

```bash
# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Estrutura do projeto

```
src/
├── components/       # Componentes reutilizáveis (botões, clock, dots...)
├── features/         # Componentes de feature (VolumeControl, SettingsModal...)
├── hooks/            # useClock, useSound, useNavigationDirection
├── layout/           # Header, Footer, Navbar, Layout
├── pages/            # PomodoroPage, TimerPage, StopwatchPage
├── stores/           # Zustand stores (pomodoroStore, timerStore...)
└── styles/           # global.css, themes.css, animations.css
```

---

## Temas

Cada tema é definido por um conjunto de CSS variables em `src/styles/themes.css`. Para adicionar um novo tema basta criar um bloco `[data-theme='nome']` e registrá-lo no `ThemeToggle`.

As variáveis cobrem: cores de fundo, grid e beams do background, blobs, navlinks, countdown e logo.

---

## Contribuindo

Contribuições são bem-vindas! Se encontrou um bug, tem uma sugestão ou quer adicionar um novo tema:

1. Fork o repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: minha feature'`
4. Push: `git push origin minha-feature`
5. Abra um Pull Request

---

## Autor

Feito com dedicação por **[</ALUCINADO-DEV>](https://alucinado-dev.vercel.app)** — de um projeto Vanilla JS para React moderno, um commit de cada vez.

---

## Licença

Distribuído sob a licença **MIT**. Veja [LICENSE](LICENSE) para detalhes.
