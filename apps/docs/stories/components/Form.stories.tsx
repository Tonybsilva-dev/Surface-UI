import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@surface/ui/form";
import { Input } from "@surface/ui/input";
import { Button } from "@surface/ui/button";
import { PasswordStrength } from "@surface/ui/password-strength";
import { StoryCard, StorySection } from "../foundation/shared";

const meta: Meta<typeof Form> = {
	title: "Components/Molecules/Form",
	component: Form,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Composição para formulários com react-hook-form. Form (FormProvider) + FormField (Controller) + FormItem, FormLabel, FormControl, FormDescription, FormMessage. Associa label ao controlo, mensagens de erro e descrições com ids de acessibilidade.",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof Form>;

/** Formulário de login simples: email e senha com Form + FormField. */
function LoginFormDemo() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => {
					// eslint-disable-next-line no-console
					console.log("submit", data);
				})}
				className="w-full max-w-sm space-y-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="nome@exemplo.pt"
									{...field}
								/>
							</FormControl>
							<FormDescription>O email será usado para notificações.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Palavra-passe</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Mín. 8 caracteres" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Entrar</Button>
			</form>
		</Form>
	);
}

export const Default: Story = {
	render: () => <LoginFormDemo />,
};

/** Formulário com validação: mensagens de erro ao submeter campos vazios. */
function FormWithValidationDemo() {
	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});

	function onSubmit(data: { username: string; password: string }) {
		// Validação manual para demo: required
		const hasUsername = data.username.trim().length > 0;
		const hasPassword = data.password.length > 0;
		if (!hasUsername) {
			form.setError("username", { message: "Nome de utilizador é obrigatório." });
		}
		if (!hasPassword) {
			form.setError("password", { message: "Palavra-passe é obrigatória." });
		}
		if (hasUsername && hasPassword) {
			// eslint-disable-next-line no-console
			console.log("submit", data);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome de utilizador</FormLabel>
							<FormControl>
								<Input placeholder="Digite o nome" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Palavra-passe</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Mín. 8 caracteres" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submeter</Button>
			</form>
		</Form>
	);
}

export const WithValidation: Story = {
	render: () => <FormWithValidationDemo />,
};

/** Registo com PasswordStrength e descrição. */
function RegisterFormDemo() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const password = form.watch("password");

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => {
					// eslint-disable-next-line no-console
					console.log("submit", data);
				})}
				className="w-full max-w-sm space-y-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="nome@exemplo.pt" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nova palavra-passe</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Mín. 8 caracteres" {...field} />
							</FormControl>
							<FormDescription>Use letras, números e símbolos para maior segurança.</FormDescription>
							<PasswordStrength password={password} />
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Criar conta</Button>
			</form>
		</Form>
	);
}

export const WithPasswordStrength: Story = {
	render: () => <RegisterFormDemo />,
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="Form (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>Form</strong> é a composição para formulários com react-hook-form. Agrupa{" "}
								<strong>Form</strong> (FormProvider), <strong>FormField</strong> (Controller por
								campo), <strong>FormItem</strong>, <strong>FormLabel</strong>, <strong>FormControl</strong>
								, <strong>FormDescription</strong> e <strong>FormMessage</strong>. Gera ids e
								aria-describedby/aria-invalid para acessibilidade e mostra mensagens de erro com
								ícone e estilo destructive.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (componentes)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li><code>Form</code> — FormProvider do react-hook-form; passa methods ao contexto.</li>
								<li><code>FormField</code> — Controller com nome do campo; render prop com field.</li>
								<li><code>FormItem</code> — Wrapper com grid gap-2; fornece id para label/control/message.</li>
								<li><code>FormLabel</code> — Label associado ao controlo (htmlFor); fica destructive em erro.</li>
								<li><code>FormControl</code> — Slot que recebe o input; aplica id, aria-describedby, aria-invalid.</li>
								<li><code>FormDescription</code> — Texto de ajuda (text-muted-foreground).</li>
								<li><code>FormMessage</code> — Mensagem de erro (ou children); ícone CircleAlert, text-destructive.</li>
								<li><code>useFormField</code> — Hook para aceder ao estado do campo (id, error, etc.) dentro de FormField + FormItem.</li>
							</ul>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Login, registo, perfis, configurações e qualquer fluxo com campos controlados e
								validação. Combine com <strong>Input</strong>, <strong>Label</strong>,{" "}
								<strong>PasswordStrength</strong>, <strong>Select</strong>, <strong>Textarea</strong> e{" "}
								<strong>Button</strong>. Use bordas mínimas (border-none) nos componentes de campo.
								O formulário de login completo (card, título, links, termos) está em{" "}
								<strong>Templates / Login</strong>.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="Form com FormField, validação e mensagens de erro">
					<p className="mb-4 text-sm text-muted-foreground">
						Exemplo de uso do Form com email e palavra-passe. Para o login completo (layout de página, links, termos) ver Templates → Login.
					</p>
					<LoginFormDemo />
				</StoryCard>
			</StorySection>
		</div>
	),
};
