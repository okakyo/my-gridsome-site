<template lang="pug">

  blog-base(:blogPath="blogPath" :chips="$page.doc.tags")
    template(v-slot:blogContent)
      .pa-3#document-title
        h1.mb-3.text-center {{$page.doc.title}}
        v-divider
      v-container
        v-layout(justify-center )
    
      
      .pa-8
        v-container
          v-layout(justify-center)
            v-flex(xs8)
              v-img(width="100%" :src="$page.doc.thumbnail" )
      p.description {{$page.doc.description}}
      .markdown(v-html="$page.doc.content")


</template>

<page-query>
query Doc ($path: String!) {
  doc: doc (path: $path) {
    title
    path
    tags {
      id
      path
    }
    description
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
        {name: 'twitter:card', content:"summary" },
        {name: 'twitter:site', content:"おかきょー" },
        {name: 'og:url', content:`https://okakyo.myvnc.com${this.$page.doc.path}` },
        {name: 'og:title', content:this.$page.doc.title },
        {name: 'og:description', content: this.$page.doc.description },
        {name: "og:image", content: `https://okakyo.myvnc.com${this.$page.doc.thumbnail}` },
      ]
    }
  },


}
</script>
<style>
.description {
  padding-left: 5%;
  padding-right: 5%;
  
  line-height: 2em;
}
.markdown{
  padding: 5%;
  padding-top: 3%;
  
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
