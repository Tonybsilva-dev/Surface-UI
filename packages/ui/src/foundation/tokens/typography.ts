/**
 * Design tokens de tipografia – type scale: Display, Headline, Title, Body, Label
 */

export interface TypeScaleToken {
  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing?: string;
}

export interface TypographyTokens {
  fontFamily: {
    default: string;
    brand?: string;
    mono?: string;
  };
  display: {
    large: TypeScaleToken;
    medium: TypeScaleToken;
    small: TypeScaleToken;
  };
  headline: {
    large: TypeScaleToken;
    medium: TypeScaleToken;
    small: TypeScaleToken;
  };
  title: {
    large: TypeScaleToken;
    medium: TypeScaleToken;
    small: TypeScaleToken;
  };
  body: {
    large: TypeScaleToken;
    medium: TypeScaleToken;
    small: TypeScaleToken;
  };
  label: {
    large: TypeScaleToken;
    medium: TypeScaleToken;
    small: TypeScaleToken;
  };
}

const defaultFontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

/** Type scale (valores em rem) */
export const typographyTokens: TypographyTokens = {
  fontFamily: {
    default: defaultFontFamily,
    brand: defaultFontFamily,
    mono: '"Roboto Mono", "Consolas", monospace',
  },
  display: {
    large: {
      fontFamily: defaultFontFamily,
      fontSize: '3.5625rem',   // 57px
      lineHeight: '4rem',
      fontWeight: '400',
      letterSpacing: '-0.025em',
    },
    medium: {
      fontFamily: defaultFontFamily,
      fontSize: '2.8125rem',   // 45px
      lineHeight: '3.25rem',
      fontWeight: '400',
      letterSpacing: '0',
    },
    small: {
      fontFamily: defaultFontFamily,
      fontSize: '2.25rem',     // 36px
      lineHeight: '2.75rem',
      fontWeight: '400',
      letterSpacing: '0',
    },
  },
  headline: {
    large: {
      fontFamily: defaultFontFamily,
      fontSize: '2rem',        // 32px
      lineHeight: '2.5rem',
      fontWeight: '400',
      letterSpacing: '0',
    },
    medium: {
      fontFamily: defaultFontFamily,
      fontSize: '1.75rem',    // 28px
      lineHeight: '2.25rem',
      fontWeight: '400',
      letterSpacing: '0',
    },
    small: {
      fontFamily: defaultFontFamily,
      fontSize: '1.5rem',     // 24px
      lineHeight: '2rem',
      fontWeight: '400',
      letterSpacing: '0',
    },
  },
  title: {
    large: {
      fontFamily: defaultFontFamily,
      fontSize: '1.375rem',   // 22px
      lineHeight: '1.75rem',
      fontWeight: '500',
      letterSpacing: '0',
    },
    medium: {
      fontFamily: defaultFontFamily,
      fontSize: '1rem',       // 16px
      lineHeight: '1.5rem',
      fontWeight: '500',
      letterSpacing: '0.009375em',
    },
    small: {
      fontFamily: defaultFontFamily,
      fontSize: '0.875rem',   // 14px
      lineHeight: '1.25rem',
      fontWeight: '500',
      letterSpacing: '0.00625em',
    },
  },
  body: {
    large: {
      fontFamily: defaultFontFamily,
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '400',
      letterSpacing: '0.03125em',
    },
    medium: {
      fontFamily: defaultFontFamily,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '400',
      letterSpacing: '0.015625em',
    },
    small: {
      fontFamily: defaultFontFamily,
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: '400',
      letterSpacing: '0.025em',
    },
  },
  label: {
    large: {
      fontFamily: defaultFontFamily,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '500',
      letterSpacing: '0.00625em',
    },
    medium: {
      fontFamily: defaultFontFamily,
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: '500',
      letterSpacing: '0.03125em',
    },
    small: {
      fontFamily: defaultFontFamily,
      fontSize: '0.6875rem',
      lineHeight: '1rem',
      fontWeight: '500',
      letterSpacing: '0.03125em',
    },
  },
};
