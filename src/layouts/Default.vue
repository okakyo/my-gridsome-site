<template lang="pug">
  v-app
    .layout
      headers
      v-content.grey.lighten-4
        slot
        v-footer(style="text-align:center").pa-3
          v-container
            v-layout(justify-center)
              p Copyright ©︎2020 Oka Kyohei All Right Reserved

</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>

import Headers from '../components/templates/Headers.vue';

export default {
  components:
    {Headers},
     
  props:{
    isShow:false
  },
  data() {
       return {
           headersUrl: [
               {title: 'works', url: '/about'},
               {title: 'Blog', url: '/blog'},
               
           ],
       };
    },
  metaInfo() { 
    return {
      title: "OkaKyo's Portfolio",
      meta: [
        {name: 'twitter:card', content:"summary_large_image" },
        {name: 'twitter:site', content:"おかきょー" },
        {name: 'og:url', content:`https://okakyo.myvnc.com` },
        {name: 'og:title', content:"OkaKyo's Portfolio"},
        {name: 'og:description', content: "おかきょーのポートフォリオサイトです。" },
        {name: "og:image", content: `https://okakyo.myvnc.com/index/profile/IMG_1267.jpeg` },
      ]
    }
  },
}
</script>

<style>
.layout {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Hiragino Kaku Gothic ProN,"メイリオ",meiryo,sans-serif
}
@font-face {
  font-family: 'Pacifico';
  font-style: normal;
  font-weight: 400;
  src: local('Pacifico Regular'), local('Pacifico-Regular'), url(https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2) format('woff2');
  font-display: swap;
}
</style>
