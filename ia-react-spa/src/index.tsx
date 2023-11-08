// NPM imports:
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// Project imports:
import './index.css';
import App from './App';
import Options from './Theme/MUITheme';
import { Routes } from './Routes';
import DocumentProvider from "./Providers/DocumentProvider";
import SelectedPieceProvider from "./Providers/SelectedPieceProvider";
import SiteStateProviders from "./Providers/SiteStateProviders";

// Establish the root
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot( rootElement! )

// Create the theme, look for the color options in ./Theme/MUITheme.ts
const themeOptions = Options;
themeOptions.components = {
    MuiPopover: { defaultProps: { container: rootElement }, },
    MuiPopper: { defaultProps: { container: rootElement }, },
};
const theme = createTheme( themeOptions );

// Create the router
const router = createBrowserRouter( Routes );

// Render the app
root.render(
    <React.StrictMode>
        {/* Manages various site-wide contexts for tone, selected piece, and site docs.*/}
        <SiteStateProviders>
            {/* StyledEngineProvider ensures the MUI styles are first in the <head> tag of index.html. Tailwind CSS styles need to be last so that they can override the MUI styles. */}
            <StyledEngineProvider injectFirst>
                {/* ThemeProvider applies the custom theme built on 22 */}
                <ThemeProvider theme={theme}>
                    {/* MUI's style preflight, replaces @tailwind base; ( opinionated tailwind base styles ) */}
                    <CssBaseline />
                    {/* RouterProvider renders the app, so <App /> is not actually needed here. */}
                    <RouterProvider router={router} />
                </ThemeProvider>
            </StyledEngineProvider>
        </SiteStateProviders>
    </React.StrictMode>
);
