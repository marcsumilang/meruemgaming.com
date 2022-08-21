module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui'), require('tailwind-scrollbar')],
	daisyui: {
		styled: true,
		themes: ['dark', 'winter'],
		base: true,
		utils: true,
		logs: true,
		rtl: false
	},
	variants: {
		// ...
		scrollbar: ['rounded']
	}
};
