// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import 'prismjs/themes/prism-tomorrow.css'

export default function (Vue, { router, head, isClient,appOptions }) {

  Vue.use(Vuetify);
  head.meta.push({
    name: "Description",
    content:"This site was made in 2020",
  });
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
  });
  head.script.push({
    src: "https://static.line-scdn.net/liff/edge/2.1/sdk.js",
  })

  // Set default layout as a global component
  appOptions.vuetify = new Vuetify({
    customVariables: ['~/assets/css/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.grey.darken4,
          accent: colors.shades.black,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  })

  Vue.component('Layout', DefaultLayout)

}
