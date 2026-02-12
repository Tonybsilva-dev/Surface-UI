/**
 * Design tokens de cor – Material Design 3
 * @see https://m3.material.io/foundations/design-tokens/overview
 * @see https://m3.material.io/styles/color/the-color-system/tokens
 *
 * Roles: primary, secondary, tertiary, error, neutral (surface/outline)
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

/** Esquema de cores claro – referência M3 */
export const lightColorScheme: ColorScheme = {
	primary: "rgb(103, 80, 164)",
	onPrimary: "rgb(255, 255, 255)",
	primaryContainer: "rgb(234, 221, 255)",
	onPrimaryContainer: "rgb(33, 0, 94)",
	inversePrimary: "rgb(208, 188, 255)",

	secondary: "rgb(98, 91, 113)",
	onSecondary: "rgb(255, 255, 255)",
	secondaryContainer: "rgb(232, 222, 248)",
	onSecondaryContainer: "rgb(31, 25, 43)",

	tertiary: "rgb(125, 99, 55)",
	onTertiary: "rgb(255, 255, 255)",
	tertiaryContainer: "rgb(255, 220, 183)",
	onTertiaryContainer: "rgb(40, 26, 0)",

	error: "rgb(179, 38, 30)",
	onError: "rgb(255, 255, 255)",
	errorContainer: "rgb(249, 222, 220)",
	onErrorContainer: "rgb(65, 14, 11)",

	surface: "rgb(254, 247, 255)",
	onSurface: "rgb(28, 27, 31)",
	surfaceVariant: "rgb(231, 224, 236)",
	onSurfaceVariant: "rgb(73, 69, 79)",
	outline: "rgb(121, 116, 126)",
	outlineVariant: "rgb(202, 196, 208)",

	inverseSurface: "rgb(49, 48, 51)",
	inverseOnSurface: "rgb(244, 239, 244)",

	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	surfaceTint: "rgb(103, 80, 164)",
};

/** Esquema de cores escuro – referência M3 */
export const darkColorScheme: ColorScheme = {
	primary: "rgb(208, 188, 255)",
	onPrimary: "rgb(55, 0, 179)",
	primaryContainer: "rgb(79, 55, 139)",
	onPrimaryContainer: "rgb(234, 221, 255)",
	inversePrimary: "rgb(103, 80, 164)",

	secondary: "rgb(204, 194, 220)",
	onSecondary: "rgb(52, 45, 65)",
	secondaryContainer: "rgb(74, 68, 88)",
	onSecondaryContainer: "rgb(232, 222, 248)",

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
	outline: "rgb(147, 143, 153)",
	outlineVariant: "rgb(73, 69, 79)",

	inverseSurface: "rgb(230, 225, 229)",
	inverseOnSurface: "rgb(49, 48, 51)",

	shadow: "rgb(0, 0, 0)",
	scrim: "rgb(0, 0, 0)",
	surfaceTint: "rgb(208, 188, 255)",
};
