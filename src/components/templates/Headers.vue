<template lang="pug">
    v-app-bar(
        :clipped-right="$vuetify.breakpoint.lgAndUp"
        app
        hide-on-scroll
        color="blue darken-3" dark)
        v-toolbar-title
            v-btn(color="primary" text to="/" )
                h2.white--text.mr-2 Top
        v-spacer
        v-toolbar-title.hidden-md-and-down(v-for="header in headersUrl" :key="header.title")
            v-btn(color="primary" text :to="header.url")
                h4.white--text.mr-2 {{header.title}}

</template>

<script>
export default {
  name:'Headers',
   data() {
       return {
           headersUrl: [
               {}
           ],
       };
    },
    
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}
.nav__link {
  margin-left: 20px;
}
</style>