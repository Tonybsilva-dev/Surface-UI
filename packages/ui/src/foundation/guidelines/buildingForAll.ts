/**
 * Guidelines de BUILDING FOR ALL – Material Design 3
 * Baseado em "user needs" e "co-design".
 * @see https://m3.material.io/foundations/building-for-all/user-needs
 * @see https://m3.material.io/foundations/building-for-all/co-design
 */

/** Dimensões de necessidades de usuários a considerar em cada decisão de design */
export const userNeedDimensions = {
  sensory: [
    'baixa-visao',
    'daltonismo',
    'audição-reduzida',
  ],
  motor: ['uso-uma-mao', 'uso-teclado', 'tremor'],
  cognitive: ['sobrecarga-informacao', 'dificuldade-leitura', 'memoria'],
  languageAndCulture: ['idioma', 'letramento-digital', 'contexto-cultural'],
  environment: ['luz-forte', 'ruido', 'conexao-instavel'],
} as const;

/** Práticas de co-design recomendadas */
export const coDesignPractices = {
  recruitDiverseParticipants: 'envolver pessoas com diferentes capacidades e contextos',
  shareOwnership: 'co-criar fluxos e componentes com pessoas usuarias, não só validar no fim',
  testEarlyAndOften: 'testar protótipos simples cedo, iterar com base em feedback real',
  compensateFairly: 'remunerar participantes e reconhecer tempo/esforço',
  documentImpact: 'registrar feedback recorrente e como ele altera componentes/padrões',
} as const;

/** Checklist de inclusão para componentes e fluxos */
export const inclusiveChecklist = {
  keyboardAccessible: 'Funciona totalmente com teclado (ordem de foco lógica, sem armadilhas).',
  screenReaderLabels: 'Labels e roles claros para leitores de tela (aria-label, aria-describedby, etc.).',
  sufficientContrast: 'Contraste atende (ou excede) as razões definidas em accessibility/contrastRatios.',
  touchTargetSize: 'Alvos de toque respeitam touchTarget (mínimo 48×48px).',
  errorRecovery: 'Estados de erro são claros e recuperáveis (mensagens compreensíveis, undo/confirm quando crítico).',
  textScalesTo200: 'Texto e layout se mantêm utilizáveis com texto em 200% (sem clipping/sobreposição).',
  avoidsColorOnly: 'Estado/erro não é comunicado apenas por cor (ícones, texto ou padrões adicionais).',
} as const;

