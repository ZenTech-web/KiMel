# 🍦 Kimel — Sistema Web para Lanchonetes

Desenvolvido pela **ZenTech**, o **Kimel** é um sistema web moderno e sofisticado voltado para lanchonetes e sorveterias. Com uma interface elegante e intuitiva, o Kimel oferece uma experiência de navegação fluida tanto para o cliente final quanto para os gestores do estabelecimento.

---

## Sobre o Sistema

O Kimel foi projetado para atender lanchonetes que buscam profissionalismo e modernidade na presença digital. O sistema permite ao cliente navegar pelo cardápio de forma simples e agradável, com páginas dedicadas para cada categoria de produto — como açaís e lanches — além de uma identidade visual marcante e responsiva.

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| **React 19** | Biblioteca principal para construção de interfaces reativas e componentizadas |
| **React Router DOM v7** | Roteamento moderno com suporte a layouts aninhados e navegação SPA |
| **Vite 7** | Bundler de alta performance com Hot Module Replacement (HMR) para desenvolvimento ágil |
| **Tailwind CSS v4** | Framework utilitário de estilização com tema totalmente customizado |
| **Fredoka One & Nunito** | Tipografia via Google Fonts, conferindo personalidade e legibilidade ao design |

---

## Estrutura do Projeto

```
src/
├── App.jsx              — Layout raiz com Header, conteúdo e Footer
├── main.jsx             — Configuração de rotas da aplicação
├── index.css            — Tema visual customizado e animações globais
├── Components/
│   ├── Header/          — Cabeçalho global
│   └── Footer/          — Rodapé global
├── Pages/
│   ├── Main/            — Página inicial com seleção de categoria
│   ├── Acaí/            — Cardápio de açaís
│   ├── Snack/           — Cardápio de lanches
│   └── NotFound/        — Página 404 personalizada
└── Data/
    └── Data.js          — Centralização dos dados do cardápio
```

---

## Como Rodar o Projeto

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## Desenvolvido por

**ZenTech** — Soluções digitais sofisticadas para negócios modernos.
