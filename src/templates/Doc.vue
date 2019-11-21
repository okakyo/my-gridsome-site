<template lang="pug">
  Layout
    v-layout.ma-2
      v-container.white
        v-flex(xs12 md10 lg8)
          h1.blog-title {{ $page.doc.title }}
          v-divider
          .markdown(v-html="$page.doc.content")
        v-flex.hidden-xs-only
          
     
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
.blog-title {
  text-align: center;
  margin: 0.5rem;
}
.markdown{
  padding: 5%;
}
.markdown p {
  line-height: 1.8rem;
}
.markdown li p {
  line-height: 1rem;
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
  border-bottom :1px solid #ddd ;
  margin: 1rem 0.5rem
}
</style>
