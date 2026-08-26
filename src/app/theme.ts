import { createTheme } from '@mui/material/styles';

const FONT_STACK = "'Inter', 'Montserrat', sans-serif";
const MONO_STACK = "'IBM Plex Mono', 'source-code-pro', monospace";

// Shared status-color mapping used by both themes — this is the single
// place status colors are defined. Any Chip/badge for blog.status should
// read from theme.palette.<status>.main, not a hardcoded hex.
const statusPalette = {
  draft: { main: '#64748B', contrastText: '#fff' }, // slate
  underReview: { main: '#D97706', contrastText: '#fff' }, // amber
  approved: { main: '#2563EB', contrastText: '#fff' }, // blue
  published: { main: '#0F9D58', contrastText: '#fff' }, // green
};

const sharedTypography = {
  fontFamily: FONT_STACK,
  h1: { fontWeight: 600, letterSpacing: '-0.02em' },
  h2: { fontWeight: 600, letterSpacing: '-0.02em' },
  h3: { fontWeight: 600, letterSpacing: '-0.01em' },
  h4: { fontWeight: 600, letterSpacing: '-0.01em' },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 500 },
  button: { fontWeight: 600, textTransform: 'none' as const }, // no ALL-CAPS buttons — reads more "tool," less "marketing site"
};

const sharedComponents = {
  MuiInputBase: {
    styleOverrides: {
      input: { padding: '8px 10px' },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' }, // kills MUI's default dark-mode gradient overlay, keeps flat enterprise surfaces
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { fontWeight: 600, fontSize: '0.75rem' },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3454D1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#64748B',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
    divider: '#E2E8F0',
    success: { main: statusPalette.published.main, contrastText: '#fff' },
    warning: { main: statusPalette.underReview.main, contrastText: '#fff' },
    info: { main: statusPalette.approved.main, contrastText: '#fff' },
  },
  shape: {
    borderRadius: 8,
  },
  typography: sharedTypography,
  components: {
    ...sharedComponents,
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5C7CFA',
      contrastText: '#0B1120',
    },
    secondary: {
      main: '#94A3B8',
    },
    background: {
      default: '#0B1120',
      paper: '#111827',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    divider: '#1E293B',
    success: { main: statusPalette.published.main, contrastText: '#0B1120' },
    warning: { main: statusPalette.underReview.main, contrastText: '#0B1120' },
    info: { main: statusPalette.approved.main, contrastText: '#0B1120' },
  },
  shape: {
    borderRadius: 8,
  },
  typography: sharedTypography,
  components: {
    ...sharedComponents,
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #1E293B',
          boxShadow: 'none',
        },
      },
    },
  },
});

export const monoFontStack = MONO_STACK; // exported for use on timestamp/ID/status text elsewhere
