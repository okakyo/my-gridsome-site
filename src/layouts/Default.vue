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
}
</script>

<style>
.layout {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Hiragino Kaku Gothic ProN,"メイリオ",meiryo,sans-serif
}
</style>
