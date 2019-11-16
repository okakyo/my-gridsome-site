<template lang="pug">
  v-app
    .layout
      Headers
      v-content
        v-container
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
               {title: 'About', url: '/about'},
               
           ],
       };
    },
}
</script>

<style>

</style>
