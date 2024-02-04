// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {}
  },
  css: ['~/assets/css/main.css'],
  modules: [
    'nuxt-highcharts',
    ['nuxt-highcharts', {
      setOptions: {
        colors: ['#0B60B0', '#FF3333', '#0D9276', '#FE7A36', '#D04848', '#F3B95F', '#FDE767', '#6895D2', '#6962AD', ],
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