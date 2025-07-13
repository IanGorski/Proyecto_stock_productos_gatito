import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FDCB6E' },
    secondary: { main: '#0984E3' },
    background: { default: '#FFF8F0' },
    success: { main: '#00B894' },
    error: { main: '#E17055' },
  },
  typography: {
    fontFamily: '"Quicksand", "Comic Sans MS", cursive, sans-serif',
    h5: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 1 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.08) rotate(-2deg)" }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s, transform 0.3s",
          "&:hover": {
            boxShadow: 8,
            transform: "scale(1.04)",
          }
        }
      }
    }
  }
});

export default theme;