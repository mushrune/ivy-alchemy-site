/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const muiTheme = require("./src/Theme/TailwindCJSBridge")

module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}", "./public/index.html"],
  important: '#root',
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Georgia', 'serif'],
    },
    extend: {
      colors: {
        'primary': muiTheme.palette.primary.main,
        'secondary': muiTheme.palette.secondary.main,
        'background-color': muiTheme.palette.background.default
      },
      animation: {
        bounce: 'bounce 7s infinite'
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'linear' },
          '50%': { transform: 'translateY(-20%)', animationTimingFunction: 'linear' }
        }
      },
    }
  },
  corePlugins: {
    preflight: false,
  },
  variants: {
    animationDelay: ["responsive", "hover"]
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
          {
            "animation-delay": ( value ) => {
              return {
                "animation-delay": value,
              };
            }
          },
          {
            values: theme("transitionDelay")
          }
      );
    })
  ]
}

