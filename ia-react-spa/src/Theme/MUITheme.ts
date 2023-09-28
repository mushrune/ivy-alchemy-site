import { ThemeOptions } from "@mui/material";

// Here are my MUI color settings. Can be customized at https://zenoo.github.io/mui-theme-creator/
const Options: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#86efac',
        },
        secondary: {
            main: '#ffeb3b',
        },
        text: {
            secondary: 'rgba(86,86,86,0.6)',
            disabled: 'rgba(146,146,146,0.38)',
        },
        background: {
            default: '#166534',
            paper: '#052e16',
        },
    },
    typography: {
        button: {
            fontWeight: 1000,
            fontFamily: '"Rubik", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h1: {
            fontFamily: 'Merriweather',
            fontWeight: 700,
        },
        h2: {
            fontFamily: 'Merriweather',
        },
        h3: {
            fontFamily: 'Merriweather',
        },
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        subtitle1: {
            fontFamily: 'Merriweather',
        },
        fontFamily: '"Rubik", "Roboto", "Helvetica", "Arial", sans-serif',
    },
};

export default Options;