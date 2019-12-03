<template lang="pug">
  Layout
    v-container
      v-layout(row wrap).ma-2
        v-flex.ma-3.white(xs12 md10 lg8)
          h2.blog-title.pa-2 {{ $page.doc.title }}
          v-divider
          .markdown(v-html="$page.doc.content")
        v-flex.ma-3(md1 lg3)
          right-sidebar

     
</template>

<page-query>
query Doc ($path: String!) {
  doc: doc (path: $path) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    content
  }
}

</page-query>
<script>
import rightSidebar from '../components/templates/Sidebar/rightSidebar.vue'
export default {
  components:{
    rightSidebar
  },
  
  metaInfo() {
    return {
      title: this.$page.doc.title,
      meta: [
        { key: 'description', name: 'description', content: this.$page.doc.description }
      ]
    }
  }
}
</script>
<style>
.blog-title {
  text-align: center;
  margin: 0.5rem;
}
.markdown{
  padding: 5%;
}
.markdown p {
  line-height: 2em;
}
.markdown li {
  line-height: 2em;
  margin-block-end: 0.5em;
}

.markdown code {
  box-shadow: none;
}

.markdown pre{
  margin: 0.5rem 0;
}
.markdown code::before{
  content: "";
  
}
.markdown img{
  max-width: 90%;
  margin: 0.5rem;
}
.markdown h3 {
  margin: 1rem  0.5rem ;
}
.markdown h1, .markdown h2 {
  border:1px solid #ddd ;
  margin: 2rem 0rem;
  background-color: #fff8e8;
  border-left: #ffc06e solid 10px ;
  padding: 0.5em 1em;

}

</style>
