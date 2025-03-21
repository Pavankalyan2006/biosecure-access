
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
				biometric: {
					blue: '#0496FF',
					teal: '#38BEC9',
					dark: '#102A43',
					light: '#F0F4F8',
					accent: '#3A86FF',
					success: '#14B8A6',
					warning: '#FBBF24',
					danger: '#EF4444',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-ring': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'50%': { opacity: '0.5' },
					'100%': { transform: 'scale(1.3)', opacity: '0' }
				},
				'scanner-line': {
					'0%': { transform: 'translateY(0%)' },
					'50%': { transform: 'translateY(100%)' },
					'51%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0%)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'heartbeat': {
					'0%': { transform: 'scale(1)' },
					'14%': { transform: 'scale(1.1)' },
					'28%': { transform: 'scale(1)' },
					'42%': { transform: 'scale(1.1)' },
					'70%': { transform: 'scale(1)' }
				},
				'dna-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
				'scanner-line': 'scanner-line 2s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'fade-in-down': 'fade-in-down 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'heartbeat': 'heartbeat 1.5s infinite',
				'dna-spin': 'dna-spin 10s linear infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'fingerprint-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,15 C31.35,15 16.25,30.1 16.25,48.75 C16.25,67.4 31.35,82.5 50,82.5 C68.65,82.5 83.75,67.4 83.75,48.75 C83.75,30.1 68.65,15 50,15 Z M50,18.75 C66.5,18.75 80,32.25 80,48.75 C80,65.25 66.5,78.75 50,78.75 C33.5,78.75 20,65.25 20,48.75 C20,32.25 33.5,18.75 50,18.75 Z M50,23.75 C36.25,23.75 25,35 25,48.75 C25,62.5 36.25,73.75 50,73.75 C63.75,73.75 75,62.5 75,48.75 C75,35 63.75,23.75 50,23.75 Z M50,27.5 C61.75,27.5 71.25,37 71.25,48.75 C71.25,60.5 61.75,70 50,70 C38.25,70 28.75,60.5 28.75,48.75 C28.75,37 38.25,27.5 50,27.5 Z M50,32.5 C41,32.5 33.75,39.75 33.75,48.75 C33.75,57.75 41,65 50,65 C59,65 66.25,57.75 66.25,48.75 C66.25,39.75 59,32.5 50,32.5 Z M50,37.5 C56.25,37.5 61.25,42.5 61.25,48.75 C61.25,55 56.25,60 50,60 C43.75,60 38.75,55 38.75,48.75 C38.75,42.5 43.75,37.5 50,37.5 Z M50,42.5 C46.5,42.5 43.75,45.25 43.75,48.75 C43.75,52.25 46.5,55 50,55 C53.5,55 56.25,52.25 56.25,48.75 C56.25,45.25 53.5,42.5 50,42.5 Z' fill='%23102A43' fill-opacity='0.03'/%3E%3C/svg%3E\")"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
