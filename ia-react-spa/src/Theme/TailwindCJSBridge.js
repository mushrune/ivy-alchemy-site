// This file is here because I want to control colors in my tailwind theme from my MUI Theme to keep things as simple as possible.
// MUITheme.ts has ESM modules / exports. tailwind.config.js is consumed directly by node and so cannot translate TS automatically.
// This bridge exists to convert the ESM exports in MUITheme.ts to CJS exports for tailwind.config.js
// Another solution would be to directly manipulate the transpilation stack and somehow handle the conversion there, but I'd rather have a bridge file

const muiTheme = require('./MUITheme')
module.exports = muiTheme