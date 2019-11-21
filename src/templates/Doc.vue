<template lang="pug">
  Layout
    v-Layout.ma-2
      v-container.white
        h1 {{ $page.doc.title }}
        .markdown(v-html="$page.doc.content")
     
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

export default {
  
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
.markdown{
  padding: 5%;
}
.markdown p {
  line-height: 1.8rem;
  text-indent: 1rem;
}
.markdown code {
  box-shadow: none;
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
  border-bottom :1px solid #ddd ;
  margin: 1rem 0.5rem
}
</style>
