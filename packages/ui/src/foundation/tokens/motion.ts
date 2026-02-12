/**
 * Design tokens de motion – duração e easing para transições consistentes.
 */

export interface MotionTokens {
  duration: {
    short1: string;
    short2: string;
    short3: string;
    short4: string;
    medium1: string;
    medium2: string;
    medium3: string;
    medium4: string;
    long1: string;
    long2: string;
    long3: string;
    long4: string;
  };
  easing: {
    standard: string;
    standardAccelerate: string;
    standardDecelerate: string;
    emphasized: string;
    emphasizedAccelerate: string;
    emphasizedDecelerate: string;
    legacy: string;
    legacyDecelerate: string;
    legacyAccelerate: string;
  };
}

/** Duração em ms */
export const motionTokens: MotionTokens = {
  duration: {
    short1: '50ms',
    short2: '100ms',
    short3: '150ms',
    short4: '200ms',
    medium1: '250ms',
    medium2: '300ms',
    medium3: '350ms',
    medium4: '400ms',
    long1: '450ms',
    long2: '500ms',
    long3: '550ms',
    long4: '600ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
    standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    legacy: 'cubic-bezier(0.4, 0, 0.2, 1)',
    legacyDecelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
    legacyAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};
