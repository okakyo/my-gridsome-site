<template lang="pug">
  v-app
    .layout
      Headers
      v-navigation-drawer(clipped app v-model="drawer" :temporary="$vuetify.breakpoint.mdAndDown")
        v-list
            v-list-item
                v-list-item-content
                    v-list-item-title.title 岡　恭平
                    v-list-item-subtitle John@yahoo.com
                v-list-item-action
                    v-icon mdi-menu-down
            v-divider
            v-list(nav dense)
                v-list-item(link v-for="header in headersUrl" :to="header.url" :key="header.title")
                    v-list-item-content
                        v-list-item-title(v-text="header.title")
            
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
