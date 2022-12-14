import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // ssr: false,
  modules: ['@nuxtjs/tailwindcss'],

  publicRuntimeConfig: {
    apiBase: process.env.API_BASE
  },
  preset: 'node-server'
});
