import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [],
	server: { host: '0.0.0.0', port: 8000 },
	clearScreen: false,
	build: { chunkSizeWarningLimit: 1600, },
	base: "./SI-379-Kevin/finalProj/"
})
