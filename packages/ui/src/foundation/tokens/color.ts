/**
 * Design tokens de cor
 * Roles: primary, secondary, tertiary, error, neutral (surface/outline).
 * Cada role tem: container, on-variant, e variantes para superfícies.
 */

export interface ColorScheme {
	// Primary
	primary: string;
	onPrimary: string;
	primaryContainer: string;
	onPrimaryContainer: string;
	inversePrimary?: string;

	// Secondary
	secondary: string;
	onSecondary: string;
	secondaryContainer: string;
	onSecondaryContainer: string;

	// Tertiary
	tertiary: string;
	onTertiary: string;
	tertiaryContainer: string;
	onTertiaryContainer: string;

	// Error
	error: string;
	onError: string;
	errorContainer: string;
	onErrorContainer: string;

	// Surface (neutral)
	surface: string;
	onSurface: string;
	surfaceVariant: string;
	onSurfaceVariant: string;
	surfaceContainerHighest?: string;
	outline: string;
	outlineVariant: string;

	// Inverse
	inverseSurface: string;
	inverseOnSurface: string;

	// Elevation / overlay
	shadow: string;
	scrim: string;
	surfaceTint?: string;
}

/** Esquema de cores claro (identidade Ant Design–like: azul primário, neutros limpos). onPrimary branco puro para contraste WCAG. */
export const lightColorScheme: ColorScheme = {
	primary: "rgb(22, 119, 255)",
	onPrimary: "#ffffff",
	primaryContainer: "rgb(230, 244, 255)",
	onPrimaryContainer: "rgb(0, 50, 120)",
	inversePrimary: "rgb(145, 213, 255)",

	secondary: "rgb(82, 82, 91)",
	onSecondary: "rgb(255, 255, 255)",
	secondaryContainer: "rgb(244, 244, 245)",
	onSecondaryContainer: "rgb(39, 39, 42)",

	tertiary: "rgb(125, 99, 55)",
	onTertiary: "rgb(255, 255, 255)",
	tertiaryContainer: "rgb(255, 220, 183)",
	onTertiaryContainer: "rgb(40, 26, 0)",

	error: "rgb(255, 77, 79)",
	onError: "rgb(255, 255, 255)",
	errorContainer: "rgb(255, 241, 240)",
	onErrorContainer: "rgb(130, 28, 28)",

	surface: "rgb(255, 255, 255)",
	onSurface: "rgb(38, 38, 38)",
	surfaceVariant: "rgb(250, 250, 250)",
	onSurfaceVariant: "rgb(82, 82, 91)",
	surfaceContainerHighest: "rgb(240, 240, 240)",
	outline: "rgb(217, 217, 217)",
	outlineVariant: "rgb(245, 245, 245)",

	inverseSurface: "rgb(38, 38, 38)",
	inverseOnSurface: "rgb(255, 255, 255)",

	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	surfaceTint: "rgb(22, 119, 255)",
};

/** Esquema de cores escuro */
export const darkColorScheme: ColorScheme = {
	primary: "rgb(89, 167, 255)",
	onPrimary: "rgb(0, 40, 100)",
	primaryContainer: "rgb(0, 60, 140)",
	onPrimaryContainer: "rgb(230, 244, 255)",
	inversePrimary: "rgb(22, 119, 255)",

	secondary: "rgb(191, 191, 198)",
	onSecondary: "rgb(39, 39, 42)",
	secondaryContainer: "rgb(63, 63, 70)",
	onSecondaryContainer: "rgb(244, 244, 245)",

	tertiary: "rgb(239, 189, 138)",
	onTertiary: "rgb(66, 43, 0)",
	tertiaryContainer: "rgb(95, 63, 7)",
	onTertiaryContainer: "rgb(255, 220, 183)",

	error: "rgb(242, 184, 181)",
	onError: "rgb(105, 0, 5)",
	errorContainer: "rgb(147, 0, 10)",
	onErrorContainer: "rgb(249, 222, 220)",

	surface: "rgb(28, 27, 31)",
	onSurface: "rgb(230, 225, 229)",
	surfaceVariant: "rgb(73, 69, 79)",
	onSurfaceVariant: "rgb(202, 196, 208)",
	surfaceContainerHighest: "rgb(55, 52, 62)",
	outline: "rgb(147, 143, 153)",
	outlineVariant: "rgb(73, 69, 79)",

	inverseSurface: "rgb(230, 225, 229)",
	inverseOnSurface: "rgb(49, 48, 51)",

	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	surfaceTint: "rgb(89, 167, 255)",
};
