/**
 * Usability – clareza, previsibilidade e aplicação expressiva
 */

/** Princípio geral de usabilidade */
export const usabilityPrinciple = {
  clarity:
    'Interfaces devem ser legíveis, previsíveis e fáceis de aprender – o usuário entende rapidamente o que pode fazer.',
  efficiency:
    'Reduza esforço cognitivo: menos passos, padrões consistentes e navegação clara entre tarefas.',
} as const;

/** Sinais de usabilidade base (legibilidade, previsibilidade, recuperação de erros) */
export const usabilitySignals = {
  legibility:
    'Texto, ícones e controles com contraste adequado, tamanho confortável e hierarquia visual clara.',
  predictability:
    'Componentes se comportam da mesma forma em todo o produto; ações semelhantes resultam em padrões previsíveis.',
  errorRecovery:
    'Mensagens de erro explicam o que aconteceu, por que e como corrigir; sempre que possível, ofereça desfazer.',
} as const;

/** Aplicação expressiva de forma usável (cor, forma, motion) */
export const applyingExpressiveUsability = {
  color:
    'Use cor para reforçar hierarquia e estados (primary, secondary, error), sem depender apenas dela para transmitir significado.',
  shape:
    'Variações de shape (corner radius) ajudam a diferenciar containers, botões e superfícies interativas.',
  motion:
    'Animações devem ser significativas (explicar transições, foco) e discretas; evite exageros que distraiam ou causem desconforto.',
} as const;

/** Padrões para evitar sobrecarga cognitiva */
export const cognitiveLoadGuidelines = {
  chunking:
    'Agrupe conteúdo em blocos lógicos (cards, seções) em vez de longos blocos de texto ou listas sem agrupamento.',
  progressiveDisclosure:
    'Mostre apenas o necessário para a próxima decisão; detalhes adicionais podem ser expandidos sob demanda.',
  familiarity:
    'Aproveite padrões conhecidos (ícones, placement de botões primários) antes de introduzir variações mais expressivas.',
} as const;

/** Acessibilidade como parte central da usabilidade */
export const accessibleUsability = {
  perceivable:
    'Conteúdo deve ser perceptível para diferentes tipos de usuários (contraste, texto alternativo, suporte a leitores de tela).',
  operable:
    'A UI deve ser totalmente operável via teclado e dispositivos assistivos; alvos de toque adequados.',
  understandable:
    'Linguagem clara, mensagens diretas, labels específicos e feedback que explique o que está acontecendo.',
} as const;

