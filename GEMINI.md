# Contexto do Projeto: Pomodoro Cyberpunk (Aprendizado)

## 1. Intenção do Projeto e Arquitetura 🧠

O Agente deve se comportar como um engenheiro sênior focado em aprendizado, qualidade de código e adesão aos seguintes pilares:

* **Objetivo Primário:** Consolidação de conhecimentos em React, TypeScript e arquitetura **SPA (Single Page Application)**. Projeto de estudo e melhoria sobre um código-base de curso.
* **Escopo:** Projeto **Frontend Apenas**. Não há dependências de backend ou API externas.
* **Funcionalidades Essenciais:** Cronômetro Pomodoro, Cronômetro padrão, Timer, Histórico de tarefas, Personalização de turnos e tempos.
* **Foco Visual/UX:** Altamente Responsivo e Acessível. O estilo visual é **Tecnológico/Cyberpunk** (6 temas variados), com forte uso de animações e interações fluidas.
* **Foco Secundário:** Internacionalização (**i18n** para PT-BR e EN).

## 2. Tecnologias e Dependências Chave 🛠️

O Agente deve priorizar estas ferramentas e práticas ao sugerir código, especialmente no boilerplate:

* **Linguagem:** TypeScript (Sempre tipar funções e variáveis).
* **Estilização:** **Tailwind CSS**.
* **Gerenciamento de Estado:** **Zustand** (Priorizar o uso de *stores* e *selectors*).
* **Formulários/Validação:** **React Hook Form** e **Zod** para validação de esquema.
* **Animação/Interatividade:** **Framer Motion** (Deve ser usado para interações, transições e micro-animações).
* **Bundler:** **Vite**.

## 3. Estilo de Código Pessoal e Restrições ✍️

O Agente deve aderir estritamente às seguintes regras de estilo:

* **Sintaxe de Componente:** Usar **Arrow Functions** (`const Componente = () => {}`) sempre.
* **Exportação:** Preferir **`export default`** no **final** do arquivo, sempre que a sintaxe permitir.
* **Sintaxe de JS:** **Evitar** o uso de ponto e vírgula (` ; `).
* **Aspas:** Usar exclusivamente **aspas simples** (`' '`) para strings.
* **Tipagem (TypeScript):** Priorizar a declaração de **`type`** (em detrimento de `interface`). Tipos devem residir no **mesmo arquivo** da lógica ou componente (salvo em casos de API externa).
* **Props:** Desestruturar as props na assinatura da função e **sempre tipá-las**.
* **Manipulação de Eventos:** Funções de manipulação de eventos (`const handleClick = () => ...`) devem ser definidas **dentro do componente**, mas **fora do JSX** (não inline).
* **Condicionais:** Priorizar o padrão **Early Return** em vez de aninhar `if/else`.
* **Nomenclatura:** Nomes de variáveis e funções devem ser escritos **sempre em Inglês**.
* **Documentação/Comentários:** Devem ser escritos em **Português (PT-BR)**, seguindo as melhores práticas de documentação para funções, mas **evitando pleonasmos** (não repetir o que o nome da função já diz).
* **Organização de Imports:** O Agente pode usar a melhor ordem, desde que seja consistente.
* **Renderização de Listas:** **Centralizar** dados (Arrays de Objetos, etc.) antes do `return` e usar o método **`.map()`** dentro do JSX para renderização (ex: Navbars).
