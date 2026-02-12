/**
 * Design guidelines – Material Design 3
 * Overview, acessibilidade, contraste, estrutura, flow, elementos, escrita,
 * adaptive design, building for all.
 * @see https://m3.material.io/foundations/designing/overview
 * @see https://m3.material.io/foundations/designing/color-contrast
 * @see https://m3.material.io/foundations/designing/structure
 * @see https://m3.material.io/foundations/designing/flow
 * @see https://m3.material.io/foundations/designing/elements
 * @see https://m3.material.io/foundations/adaptive-design/large-screens/overview
 */

export { contrastRatios, focusRing, touchTarget } from './accessibility';

export { layoutRegions, paneTypes, layoutBreakpoints } from './structure';

export {
  layoutOverview,
  layoutSpacingAndParts,
  layoutDensityGuidelines,
  hardwareLayoutGuidelines,
  bidirectionalityGuidelines,
} from './layout';

export { flowGuidelines, navigationBarDestinations } from './flow';

export { componentCategories, componentCategoryExamples } from './elements';

export { writingBestPractices, textTruncation, textResizing } from './writing';

export {
  windowWidthClasses,
  windowHeightClasses,
  canonicalLayouts,
  adaptiveNavigationPatterns,
} from './adaptive';

export {
  userNeedDimensions,
  coDesignPractices,
  inclusiveChecklist,
} from './buildingForAll';

export {
  contentDesignPrinciple,
  altTextGuidelines,
  globalWritingGuidelines,
  notificationGuidelines,
  styleGuideUxWriting,
  styleGuideWordChoice,
  styleGuideGrammar,
} from './contentDesign';

export {
  interactionPrinciple,
  gestureGuidelines,
  inputGuidelines,
  selectionGuidelines,
  statesOverview,
  stateLayersGuidelines,
  applyingStatesGuidelines,
} from './interaction';

export {
  usabilityPrinciple,
  usabilitySignals,
  applyingExpressiveUsability,
  cognitiveLoadGuidelines,
  accessibleUsability,
} from './usability';

export {
  glossaryEntries,
  glossaryByCategory,
  glossaryCategoryLabels,
  type GlossaryEntry,
} from './glossary';

export {
  colorSystemOverview,
  colorSystemHowItWorks,
  colorRolesSummary,
  colorSchemeTabs,
  colorAdvancedTabs,
  colorResources,
} from './colorStyles';

export {
  elevationOverview,
  applyingElevationGuidelines,
  elevationTokensSummary,
} from './elevationStyles';

export {
  iconOverview,
  iconDesigningGuidelines,
  iconApplyingGuidelines,
  iconSizeRecommendations,
} from './iconStyles';

export {
  motionOverview,
  motionEasingAndDuration,
  motionTransitions,
} from './motionStyles';

export {
  shapeOverview,
  shapeCornerRadiusScale,
  shapeMorph,
} from './shapeStyles';

export {
  typographyOverview,
  typographyFonts,
  typographyTypeScale,
  typographyApplyingType,
  typographyEditorialTreatments,
} from './typographyStyles';
