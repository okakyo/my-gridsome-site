<template lang="pug">
  v-app
    .layout
      headers
      v-content.grey.lighten-4
        slot
      v-footer
        h5 Copyright

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

</style>
