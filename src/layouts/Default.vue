<template lang="pug">
  v-app
    .layout
      Headers
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

import Headers from '../components/templates/Headers';
export default {
  components:
    {Headers},
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
