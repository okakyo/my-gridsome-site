<template>
  <Layout>
    <div class="card">
      <h2>
        {{ $page.doc.title }}
      </h2>
      <div class="markdown" v-html="$page.doc.content" />
     </div>
  </Layout>
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


<style lang="scss">
/deep/ > p {
  opacity: .8;
}

/deep/ > h2 {
  padding-top: 100px;
  margin-top : -80px;

  @include respond-above(md) {
    font-size: 2rem;
  }
}

.markdown {
  padding-bottom: 0;
  ui {
    padding-inline-start:10px!important;
  }
}


</style>

