<template lang="pug">
  v-app
    .layout
      headers
      v-content.grey.lighten-4
        slot
            

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
import Sidebar from '../components/templates/Sidebar.vue';
export default {
  components:
    {Headers,Sidebar},
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

</style>
