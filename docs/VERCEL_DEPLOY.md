# Deploy na Vercel (preview + production)

Com base na documentação Vercel e Turborepo.

## Configuração recomendada

- **Root Directory:** deixar **vazio** (raiz do repositório). Assim o monorepo é reconhecido e o `pnpm install` + Turbo funcionam.
- **Build Command / Output:** definidos em `vercel.json` na raiz:
  - `buildCommand`: `turbo run build --filter=docs` (só o app docs e dependências)
  - `outputDirectory`: `apps/docs/storybook-static`
  - `installCommand`: `pnpm install`

## Preview vs Production

- **Production:** deploy da branch configurada como “Production Branch” (ex.: `main`).
- **Preview:** deploys de outras branches e PRs usam o **mesmo** `vercel.json`; não é necessário configurar comandos diferentes.
- Para builds diferentes por branch, use variáveis de ambiente na Vercel (ex.: `VERCEL_GIT_COMMIT_REF`) e, se precisar, um script que escolha o comando de build.

## Storybook e providers (ex.: Tooltip)

- O **preview** do Storybook (`.storybook/preview.tsx`) usa **decorators** para envolver todas as stories.
- Assim fica um único lugar para adicionar providers (tema, contexto, etc.) sem quebrar componentes que dependem deles (ex.: Tooltip).
- O ficheiro deve ser **`.tsx`** (ou `.jsx`) para o Vite/Storybook carregarem JSX sem erro; `.js` com JSX pode causar “Failed to fetch dynamically imported module”.

## Checklist no painel Vercel

1. **Settings → General**
   - Root Directory: **vazio**
   - Node.js Version: **18.x** ou **20.x**
   - Production Branch: **main** (ou a que quiser)

2. **Settings → Environment Variables**
   - Se usar `turbo.json` com `globalEnv: ["NPM_TOKEN"]`, defina `NPM_TOKEN` só se for publicar pacotes no build.
   - Para evitar OOM no build do Storybook, pode definir `NODE_OPTIONS=--max-old-space-size=4096` (ou já está no script em `apps/docs/package.json`).

3. Não preencher “Build Command” nem “Output Directory” no painel se estiver a usar `vercel.json`; o ficheiro tem prioridade.
