<template lang="pug">

  blog-base(:blog-title="$page.doc.title" :blogPath="blogPath")

    template(v-slot:blogContent)

      .pa-9
        v-img.pa-9(width="100%" :src="$page.doc.thumbnail" )
      v-divider
      .markdown(v-html="$page.doc.content")


</template>

<page-query>
query Doc ($path: String!) {
  doc: doc (path: $path) {
    title
    path
    thumbnail
    date (format: "D. MM YYYY")
    timeToRead
    content
  }
}

</page-query>
<script>
import rightSidebar from '../components/templates/Sidebar/rightSidebar.vue'
import BlogBase from "../components/templates/blogBase";
export default {
  components:{
    BlogBase,
    rightSidebar
  },
  data() {
    return {

      blogPath:[
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Blog',
          href: '/blog',
        },

      ]
    }
  },
  mounted(){
    this.blogPath.push({text:this.$page.doc.title,href:this.$route.path})
  },

  
  metaInfo() {
    return {
      title: this.$page.doc.title,
      meta: [
        { key: 'description', name: 'description', content: this.$page.doc.description }
      ]
    }
  },


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
