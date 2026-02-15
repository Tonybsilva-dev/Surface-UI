import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { LoginFormCompleto, LoginFormSkeleton } from "../components/LoginFormCompleto";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta = {
	title: "Components/Templates/Login",
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"Template de página de login: grid de duas colunas (conteúdo + aside), skip link, main com formulário, área de marca.",
			},
		},
	},
};

export default meta;

type Story = StoryObj;

/** Layout da página de login: main (form) + aside (marca). */
function LoginPageLayout({ children }: { children: ReactNode }) {
	return (
		<div
			className="grid min-h-svh lg:grid-cols-2"
			role="application"
			aria-label="Aplicação de autenticação"
		>
			<a
				href="#conteudo-principal"
				title="Saltar para o conteúdo principal"
				className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:font-medium focus:outline-none focus:ring-2 focus:ring-ring"
				aria-label="Saltar para o conteúdo principal do formulário de login"
			>
				Saltar para o conteúdo principal
			</a>

			<main
				id="conteudo-principal"
				aria-label="Formulário de autenticação"
				className="flex flex-col gap-4 p-6 md:p-10"
			>
				<header className="flex justify-center gap-2 md:justify-start">
					<span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
						Design System
					</span>
				</header>

				<section
					aria-labelledby="titulo-login"
					aria-describedby="descricao-login"
					className="flex flex-1 items-center justify-center"
				>
					<div className="w-full max-w-xs">{children}</div>
				</section>

				<section aria-label="Informações adicionais" className="sr-only">
					<p id="descricao-login">
						Esta página permite fazer login na conta usando email e senha. Todos os campos são obrigatórios.
					</p>
				</section>
			</main>

			<aside
				className="hidden min-h-svh flex-col items-center justify-center bg-muted lg:flex"
				aria-label="Área visual de marca"
			>
				<div className="flex flex-col items-center gap-4" aria-hidden="true">
					<div className="size-40 rounded-lg bg-muted-foreground/10" title="Logotipo (placeholder)" />
				</div>
			</aside>
		</div>
	);
}

export const Default: Story = {
	render: () => (
		<LoginPageLayout>
			<LoginFormCompleto />
		</LoginPageLayout>
	),
};

export const Skeleton: Story = {
	render: () => (
		<LoginPageLayout>
			<LoginFormSkeleton />
		</LoginPageLayout>
	),
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Template Login (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								Template de página de login: layout em grid (conteúdo principal + aside), skip link
								para acessibilidade, <strong>main</strong> com o formulário e <strong>aside</strong> para
								marca/ilustração. Use o organismo <strong>LoginFormCompleto</strong> no main e o estado{" "}
								<strong>LoginFormSkeleton</strong> durante o carregamento.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Como o template é construído</h3>
							<p className="mb-2">
								O template não é só o formulário: é a <strong>composição</strong> do layout da página com o formulário dentro.
							</p>
							<ol className="list-inside list-decimal space-y-1.5 text-muted-foreground">
								<li><strong>LoginPageLayout</strong> — Grid de duas colunas (main + aside), skip link, main com área central para o conteúdo.</li>
								<li>Dentro do main, a secção central recebe <code>children</code>: o bloco do formulário.</li>
								<li>Esse <code>children</code> é o <strong>LoginFormCompleto</strong> (título, campos, botão, termos).</li>
							</ol>
							<pre className="mt-3 overflow-x-auto rounded-md border border-border bg-muted/30 p-3 text-xs">
								{`render: () => (
  <LoginPageLayout>
    <LoginFormCompleto />
  </LoginPageLayout>
)`}
							</pre>
							<p className="mt-2">
								Assim, o mesmo layout (header, skip link, aside para marca) pode ser reutilizado com <strong>LoginFormCompleto</strong> ou <strong>LoginFormSkeleton</strong> conforme o estado.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Estados</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><strong>Default</strong> — Formulário pronto (validação zod, erro root).</li>
								<li><strong>Skeleton</strong> — Estado de carregamento antes do form aparecer.</li>
								<li>Na aplicação real: empty (primeira visita), error (credenciais inválidas), no-connection (rede).</li>
							</ul>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo: página completa">
				<StoryCard title="Login page com form e aside">
					<p className="mb-4 text-sm text-muted-foreground">
						Template completo: <strong>LoginPageLayout</strong> envolve <strong>LoginFormCompleto</strong>. Em produção: substituir placeholder do aside por logo; adicionar estados error/empty/no-connection conforme necessário.
					</p>
					<LoginPageLayout>
						<LoginFormCompleto />
					</LoginPageLayout>
				</StoryCard>
			</StorySection>
		</div>
	),
};
