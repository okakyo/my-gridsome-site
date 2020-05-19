<template lang="pug">
    v-app-bar(
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3" dark)
        v-toolbar-title
            v-btn(color="primary" text to="/" )
                h4.white--text.mr-2 Top
        v-spacer
        v-toolbar-title 
            h4 おかきょーのブログ
        v-spacer
        v-toolbar-title(v-for="header in headersUrl" :key="header.title")
            v-btn(color="primary" text :href="header.url")
                h4.white--text.mr-2 {{header.title}}

</template>

<script>
export default {
  name:'Headers',
   data() {
       return {
           headersUrl: [
               {title:"blog",url:"/blog"}
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
