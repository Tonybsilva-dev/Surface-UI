/**
 * Guidelines de elementos e componentes – Material Design 3
 * @see https://m3.material.io/foundations/designing/elements
 * @see https://m3.material.io/components
 *
 * Categorias de componentes para manter consistência.
 */

/** Categorias de componentes M3 */
export const componentCategories = {
  action: 'action',
  containment: 'containment',
  communication: 'communication',
  navigation: 'navigation',
  selection: 'selection',
  textInput: 'text-input',
} as const;

/** Exemplos por categoria (para referência ao construir a lib) */
export const componentCategoryExamples = {
  [componentCategories.action]: [
    'Button (filled, tonal, outlined, text)',
    'FAB, Extended FAB',
    'Icon button',
    'Segmented button',
    'Split button',
  ],
  [componentCategories.containment]: [
    'Card (filled, elevated, outlined)',
    'Badge, Badged box',
    'Divider',
    'Loading / progress indicator',
  ],
  [componentCategories.communication]: [
    'Snackbar',
    'Banner',
    'Dialog',
    'Tooltip',
  ],
  [componentCategories.navigation]: [
    'Navigation bar',
    'Navigation drawer',
    'Navigation rail',
    'Tabs',
    'Bottom sheet',
  ],
  [componentCategories.selection]: [
    'Checkbox',
    'Chip (assist, filter, input, suggestion)',
    'Date/time picker',
    'Radio',
    'Switch',
  ],
  [componentCategories.textInput]: [
    'Text field (filled, outlined)',
    'Search bar',
  ],
} as const;
