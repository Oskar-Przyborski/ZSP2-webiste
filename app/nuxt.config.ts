import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
	modules: ["@nuxtjs/sanity", "nuxt-icon", "@nuxt/image-edge"],
	css: ["~/assets/global.css"],
	sanity: {
		projectId: "vm3xce09",
		dataset: "production",
		useCdn: true
	},
});