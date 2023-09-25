import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import './index.css';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement!)

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#496069',
        },
        secondary: {
            main: '#058fe4',
        },
        text: {
            secondary: 'rgba(86,86,86,0.6)',
            disabled: 'rgba(146,146,146,0.38)',
        },
    },
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement
            },
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement
            },
        },
    },
});

root.render(
  <React.StrictMode>
      {/*StyledEngineProvider ensures the MUI styles are first in the <head> tag of index.html.
      Tailwind CSS styles need to be last so that they can override the MUI styles.*/}
      <StyledEngineProvider injectFirst>
          {/*ThemeProvider applies our custom theme.*/}
          <ThemeProvider theme={theme}>
              {/* MUI's style preflight, replaces @tailwind base; ( opinionated tailwind base styles )*/}
              <CssBaseline />
              <App />
          </ThemeProvider>
      </StyledEngineProvider>
  </React.StrictMode>
);
