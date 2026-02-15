import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PasswordStrength } from "@surface/ui/password-strength";
import { Input } from "@surface/ui/input";
import { Label } from "@surface/ui/label";
import { StoryCard, StorySection } from "../foundation/shared";

function PasswordStrengthOverviewDemo() {
	const [password, setPassword] = useState("");
	return (
		<div className="w-full max-w-[320px] space-y-2">
			<Label htmlFor="pw-overview">Nova palavra-passe</Label>
			<Input
				id="pw-overview"
				type="password"
				placeholder="Mín. 8 caracteres"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<PasswordStrength password={password} />
		</div>
	);
}

const meta: Meta<typeof PasswordStrength> = {
	title: "Components/Atoms/PasswordStrength",
	component: PasswordStrength,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"Indicador visual da força da senha (5 níveis). Usa tokens de cor (destructive, primary, muted) e motion. Acessível (role=status, aria-live).",
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof PasswordStrength>;

export const Default: Story = {
	render: function DefaultRender() {
		const [password, setPassword] = useState("");
		return (
			<div className="w-full max-w-[320px] space-y-2">
				<Label htmlFor="pw-demo">Palavra-passe</Label>
				<Input
					id="pw-demo"
					type="password"
					placeholder="Introduza a senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<PasswordStrength password={password} />
			</div>
		);
	},
};

export const Overview: Story = {
	render: () => (
		<div className="space-y-8 p-8">
			<StorySection title="PasswordStrength (overview)">
				<StoryCard title="Documentação">
					<div className="space-y-4 text-sm">
						<section>
							<h3 className="mb-2 font-semibold">O que é</h3>
							<p>
								O <strong>PasswordStrength</strong> mostra a força da senha em 5
								níveis (muito fraca a muito forte) com barras e rótulo. Usa
								tokens de cor (destructive, primary, muted, success) e motion
								(duration-medium, ease-standard). Acessível (role=status,
								aria-live, aria-label).
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">API (props)</h3>
							<ul className="list-inside list-disc space-y-1">
								<li>
									<code>password</code> — string; quando vazia o componente não
									renderiza nada.
								</li>
							</ul>
							<p className="mt-2">
								Critérios: comprimento ≥8, minúsculas, maiúsculas, números,
								caracteres especiais. Cada critério cumprido sobe um nível.
							</p>
						</section>
						<section>
							<h3 className="mb-2 font-semibold">Onde é usado</h3>
							<p>
								Em formulários de registo e alteração de palavra-passe, junto do
								campo Input type="password". Combine com <strong>Label</strong> e{" "}
								<strong>Input</strong>.
							</p>
						</section>
					</div>
				</StoryCard>
			</StorySection>
			<StorySection title="Exemplo completo">
				<StoryCard title="PasswordStrength: campo de senha com indicador">
					<p className="mb-4 text-sm text-muted-foreground">
						Campo de palavra-passe com label e indicador de força em tempo real.
						Digite para ver os níveis (muito fraca → muito forte).
					</p>
					<PasswordStrengthOverviewDemo />
				</StoryCard>
			</StorySection>
		</div>
	),
};
