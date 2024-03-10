import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './public/**/*.html',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  mode: 'jit',
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
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      transitionProperty: {
        'height': 'height'
      },
      fontFamily: {
        primary: "Galano",
      },
      colors: {
        esig: {
          DEFAULT: "hsl(var(--esig))",
          white: "hsl(var(--esig-white))",
          black: "hsl(var(--esig-black))",
          flaxflower: "hsl(var(--esig-flaxflower))",
          sapphire: "hsl(var(--esig-sapphire))",
          fluorite: "hsl(var(--esig-fluorite))",
          nightshade: "hsl(var(--esig-nightshade))",
          midblue: "hsl(var(--esig-midblue))",
          anthracite: "hsl(var(--esig-anthracite))",
          primary: "hsl(var(--esig-primary))",
          secondary: "hsl(var(--esig-secondary))",
          surface: {
            '40': "hsl(var(--esig-surface-blue-40))",
            '30': "hsl(var(--esig-surface-blue-30))",
            '20': "hsl(var(--esig-surface-blue-20))",
            '10': "hsl(var(--esig-surface-blue-10))"
          },
          products: {
            home: "hsl(var(--esig-product-home))",
            travelLeisure: "hsl(var(--esig-product-travelLeisure))",
            car: "hsl(var(--esig-product-car))",
            accident: "hsl(var(--esig-product-accident))",
            health: "hsl(var(--esig-product-health))",
            legal: "hsl(var(--esig-product-legal))",
            care: "hsl(var(--esig-product-care))",
            pensionsAssets: "hsl(var(--esig-product-pensionsAssets))",
            incomeProtectionRiskHedging: "hsl(var(--esig-product-incomeProtectionRiskHedging))",
            art: "hsl(var(--esig-product-art))",
            entrepreneurs: "hsl(var(--esig-product-entrepreneurs))",
            operations: "hsl(var(--esig-product-operations))",
          },
          success: "hsl(var(--esig-success))",
          warning: "hsl(var(--esig-warning))",
          error: "hsl(var(--esig-error))",
          virtualization: {
            'blue-100': "hsl(var(--esig-virtualization-blue-100))",
            'blue-90': "hsl(var(--esig-virtualization-blue-90))",
            'blue-80': "hsl(var(--esig-virtualization-blue-80))",
            'blue-70': "hsl(var(--esig-virtualization-blue-70))",
            'blue-60': "hsl(var(--esig-virtualization-blue-60))",
            'black-100': "hsl(var(--esig-virtualization-black-100))",
            'black-50': "hsl(var(--esig-virtualization-black-50))",
            'black-10': "hsl(var(--esig-virtualization-black-10))",
            'purple-100': "hsl(var(--esig-virtualization-purple-100))",
            'purple-50': "hsl(var(--esig-virtualization-purple-50))",
            'green-100': "hsl(var(--esig-virtualization-green-100))",
            'green-50': "hsl(var(--esig-virtualization-green-50))",
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
  ],
} satisfies Config

export default config