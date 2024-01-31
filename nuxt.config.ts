// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {

    }
  },
  css: ['~/assets/css/main.css'],
  modules: [
    'nuxt-highcharts',
    ['nuxt-highcharts', {
      setOptions: {
        colors: ['#0B60B0', '#FF3333', '#6C22A6', '#333333'],
        credits: {
          enabled: false
        },
        backgroundColor: 'transparent',
        lang: {
          downloadPNG: 'Unduh Gambar PNG',
          downloadJPEG: 'Unduh Gambar JPEG',
          downloadPDF: 'Unduh File PDF',
        }
      }
     }]
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})