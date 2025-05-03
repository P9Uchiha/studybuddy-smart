
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			perspective: {
				'1000': '1000px',
			},
			transformStyle: {
				'3d': 'preserve-3d',
			},
			backfaceVisibility: {
				'hidden': 'hidden',
			},
			transform: {
				'rotate-y-180': 'rotateY(180deg)',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				"study-green": {
					50: "#E8F7ED",
					100: "#C7EBD3",
					200: "#92D9AD",
					300: "#4AC181",
					400: "#2EAA67",
					500: "#25945A",
					600: "#1E7A49",
					700: "#175E38",
					800: "#124A2C",
					900: "#0A2E1B",
				},
				"study-blue": {
					50: "#E6F2FC",
					100: "#CCDFF9",
					200: "#99C3F3",
					300: "#66A0EC",
					400: "#3378E1",
					500: "#1D55C0",
					600: "#18459F",
					700: "#13397F",
					800: "#0F2E64",
					900: "#081C3D",
				},
				"study-peach": {
					50: "#FFF3EA",
					100: "#FFDFC6",
					200: "#FFB989",
					300: "#FF934D",
					400: "#FF7A24",
					500: "#FF6600",
					600: "#CC5200",
					700: "#993D00",
					800: "#662900",
					900: "#331400",
				},
				"study-dark": {
					700: "#121E2C",
					800: "#0D1622",
					900: "#0A101A",
				},
				"study-neutral": {
					50: "#FFFFFF",
					100: "#F1F0FB",
					200: "#E2E8F0",
					300: "#CBD5E1",
					400: "#8E9196",
					500: "#64748B",
					600: "#475569",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'flip': {
					'0%, 100%': { transform: 'rotateY(0deg)' },
					'50%': { transform: 'rotateY(180deg)' },
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.6' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flip': 'flip 0.8s ease-in-out',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.perspective-1000': {
					'perspective': '1000px',
				},
				'.transform-style-3d': {
					'transform-style': 'preserve-3d',
				},
				'.backface-hidden': {
					'backface-visibility': 'hidden',
				},
				'.rotate-y-180': {
					'transform': 'rotateY(180deg)',
				}
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
