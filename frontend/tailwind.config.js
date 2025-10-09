/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* transparent-black */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* coral */
        background: "var(--color-background)", /* clean-white */
        foreground: "var(--color-foreground)", /* charcoal-gray */
        primary: {
          DEFAULT: "var(--color-primary)", /* coral */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* ocean-blue */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-400 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* light-gray */
          foreground: "var(--color-muted-foreground)", /* medium-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* sunset-orange */
          foreground: "var(--color-accent-foreground)", /* charcoal-gray */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* charcoal-gray */
        },
        card: {
          DEFAULT: "var(--color-card)", /* light-gray */
          foreground: "var(--color-card-foreground)", /* charcoal-gray */
        },
        success: {
          DEFAULT: "var(--color-success)", /* green-400 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* orange-400 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-400 */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'caveat': ['Caveat', 'cursive'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cursor-appear": "cursorAppear 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "particle-burst": "particleBurst 2s ease-out forwards",
        "breathe": "breathe 3s ease-in-out infinite",
        "flip-reveal": "flipReveal 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
        "pulse-orange": "pulseOrange 2s ease-in-out infinite",
        "emoji-bounce": "emojiBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "cursorAppear": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "particleBurst": {
          "0%": { 
            opacity: "1", 
            transform: "translate(0, 0) scale(1)" 
          },
          "100%": { 
            opacity: "0", 
            transform: "translate(var(--particle-x, 20px), var(--particle-y, -20px)) scale(0)" 
          },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "flipReveal": {
          "0%": { 
            transform: "rotateY(180deg)", 
            opacity: "0" 
          },
          "100%": { 
            transform: "rotateY(0deg)", 
            opacity: "1" 
          },
        },
        "slideInRight": {
          "0%": { 
            transform: "translateX(100px)", 
            opacity: "0" 
          },
          "100%": { 
            transform: "translateX(0)", 
            opacity: "1" 
          },
        },
        "pulseOrange": {
          "0%, 100%": { 
            boxShadow: "0 0 0 0 rgba(255, 230, 109, 0.4)" 
          },
          "50%": { 
            boxShadow: "0 0 0 10px rgba(255, 230, 109, 0)" 
          },
        },
        "emojiBounce": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'collaborative': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}