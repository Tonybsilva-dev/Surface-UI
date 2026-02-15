/**
 * Formulário de login completo para uso em Form stories e Templates/Login.
 * Demonstra: zodResolver, mode onBlur, reValidateMode onChange, erro root, acessibilidade.
 */
import * as React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@surface/ui/form";
import { Input } from "@surface/ui/input";
import { Button } from "@surface/ui/button";

export const loginSchema = z.object({
	email: z.string().min(1, "Email é obrigatório.").email("Email inválido."),
	password: z
		.string()
		.min(1, "Senha é obrigatória.")
		.min(8, "Mínimo 8 caracteres."),
});

export type LoginValues = z.infer<typeof loginSchema>;

/** Alerta de erro global do formulário (erro root). Deve ser usado dentro de Form. */
export function FormErrorAlert({ title }: { title: string }) {
	const { formState } = useFormContext();
	const rootError = formState.errors.root;

	if (!rootError?.message) return null;

	return (
		<div
			role="alert"
			aria-live="polite"
			className="rounded-md border-0 border-none bg-destructive/10 p-3 text-sm text-destructive"
		>
			<p className="font-medium">{title}</p>
			<p className="mt-0.5">{String(rootError.message)}</p>
		</div>
	);
}

export function LoginFormCompleto() {
	const [isPending, setIsPending] = React.useState(false);
	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		mode: "onBlur",
		reValidateMode: "onChange",
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = (_data: LoginValues) => {
		setIsPending(true);
		setTimeout(() => {
			form.setError("root", {
				type: "manual",
				message:
					"Erro ao realizar login. Verifique as credenciais e tente novamente.",
			});
			setIsPending(false);
		}, 600);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full max-w-xs flex-col gap-6"
				aria-labelledby="titulo-login"
				aria-describedby="ajuda-autenticacao"
				noValidate
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 id="titulo-login" className="text-2xl font-bold">
						Entre na sua conta
					</h1>
					<p className="text-sm text-muted-foreground text-balance">
						Digite o seu email abaixo para fazer login na sua conta.
					</p>
					<p id="ajuda-autenticacao" className="sr-only">
						Todos os campos são obrigatórios. Utilize o seu email e senha para aceder.
					</p>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel htmlFor="email-login">Email</FormLabel>
								<span
									className="ml-auto text-sm text-muted-foreground"
									title="Ainda não é membro? Contacte para criar uma conta"
								>
									Ainda não é membro?
								</span>
							</div>
							<FormControl>
								<Input
									{...field}
									id="email-login"
									name="email"
									type="email"
									placeholder="nome@exemplo.pt"
									autoComplete="email"
									autoCapitalize="none"
									autoCorrect="off"
									className="h-10 border-0"
									disabled={isPending}
									aria-invalid={!!form.formState.errors.email}
								/>
							</FormControl>
							<FormMessage id="email-error" role="alert" aria-live="polite" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center">
								<FormLabel htmlFor="password-login">Senha</FormLabel>
								<button
									type="button"
									className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
									title="Recuperar senha"
									aria-label="Esqueceu a senha? Recuperar acesso"
								>
									Esqueceu a senha?
								</button>
							</div>
							<FormControl>
								<Input
									{...field}
									id="password-login"
									name="password"
									type="password"
									placeholder="Mín. 8 caracteres"
									autoComplete="current-password"
									className="h-10 border-0"
									disabled={isPending}
									aria-invalid={!!form.formState.errors.password}
								/>
							</FormControl>
							<FormMessage id="password-error" role="alert" aria-live="polite" />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
					<FormErrorAlert title="Erro ao realizar login" />
				)}

				<Button
					type="submit"
					className="h-10 w-full border-0"
					disabled={isPending}
					aria-label={isPending ? "A entrar, aguarde..." : "Entrar na conta"}
				>
					{isPending ? "A entrar..." : "Entrar"}
				</Button>

				<p className="text-center text-xs text-muted-foreground">
					Ao entrar, concorda com os{" "}
					<button
						type="button"
						className="underline underline-offset-4 transition-colors hover:text-foreground"
						title="Ler termos e condições"
						aria-label="Ler termos e condições de uso"
					>
						Termos e Condições
					</button>
					.
				</p>
			</form>
		</Form>
	);
}

/** Skeleton do formulário de login (estado de carregamento). */
export function LoginFormSkeleton() {
	return (
		<div className="flex w-full max-w-xs flex-col gap-6 animate-pulse">
			<div className="flex flex-col items-center gap-1 text-center">
				<div className="size-10 mb-4 rounded bg-muted" />
				<div className="h-6 w-40 rounded bg-muted" />
				<div className="h-3 w-64 rounded bg-muted" />
			</div>
			<div className="space-y-2">
				<div className="h-4 w-16 rounded bg-muted" />
				<div className="h-10 w-full rounded bg-muted" />
			</div>
			<div className="space-y-2">
				<div className="h-4 w-14 rounded bg-muted" />
				<div className="h-10 w-full rounded bg-muted" />
			</div>
			<div className="h-10 w-full rounded bg-muted" />
		</div>
	);
}
