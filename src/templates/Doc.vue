<template lang="pug">

  blog-base(:blogPath="blogPath" :chips="$page.doc.tags")
    template(v-slot:blogContent)
      .pa-3#document-title
        h1.mb-3.text-center {{$page.doc.title}}
        v-divider
      v-container
        v-layout(justify-center)
          v-btn.mx-3(fab outlined  v-for="button in shareButtons" :key="button.name" :color="button.color" :href="button.url" rel="nofollow" target="_blank") 
            v-icon(v-if="button.icon") {{button.icon}}
            h2(v-else).fa-hatena
            
      .pa-8
        v-container
          v-layout(justify-center)
            v-flex(xs8)
              v-img(width="100%" :lazy-src="$page.doc.thumbnail" loading="lazy" :src="$page.doc.thumbnail" )
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

      ],
      shareButtons: [
        {
          name:"twitter",
          url:`https://twitter.com/share?url=https://okakyo.myvnc.com${this.$route.path}`,
          icon:"mdi-twitter",
          color:"info"
        },
        {
          name:"facebook",
          url:`https://www.facebook.com/share.php?u=https://okakyo.myvnc.com${this.$route.path}`,
          icon:"mdi-facebook",
          color:"primary"
        },
        {
          name:"pocket",
          url:`https://getpocket.com/edit?url=https://okakyo.myvnc.com${this.$route.path}`,
          icon:"mdi-pocket",
          color:"error"
        },
        {
          name: "hatena",
          url:`https://b.hatena.ne.jp/add?mode=confirm&url=https://okakyo.myvnc.com${this.$route.path}`,
          
          src:"/hatenabookmark-logomark.svg",
          color:"info"
        },
      ]
    }
  },
  mounted(){
    this.blogPath.push({text:this.$page.doc.title,href:this.$route.path});
    this.shareButtons.map(e=>{
      if(e.name==="twitter"){
        e.url+=`&text=${this.$page.doc.title}`
        }
      else if(e.name==="hatena"){
        e.url+=`${this.$route.path}`
      }
    });
  },

  
  metaInfo() {
    return {
      title: this.$page.doc.title,
      meta: [
        {name: 'twitter:card', content:"summary_large_image" },
        {name: 'twitter:site', content:"おかきょー" },
        {name: 'og:url', content:`https://okakyo.myvnc.com${this.$page.doc.path}` },
        {name: 'og:title', content:this.$page.doc.title },
        {name: 'og:description', content: this.$page.doc.description },
        {name: "og:image", content: `https://okakyo.myvnc.com/${this.$page.doc.thumbnail}` },
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
  padding:0.75em;
  line-height: 1.8em;
}
.markdown ul {
  margin-bottom: 1.5em;
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

.markdown h2 {
  margin-bottom :0.75em ;
  padding: 0.5em;/*文字周りの余白*/
  color: #010101;/*文字色*/
  background: #eaf3ff;/*背景色*/
  
}

.markdown h3 {
  padding: 0.25em 0.5em;/*上下 左右の余白*/
  margin-bottom:0.75em;
  color: #494949;/*文字色*/
  background: transparent;/*背景透明に*/
  border-left: solid 5px #7db4e6;/*左線*/
}
.markdown h1 {
  border:1px solid #ddd ;
  margin: 2rem 0rem;
  background-color: #fff8e8;
  border-left: #ffc06e solid 10px ;
  padding: 0.5em 1em;

}

/* Font Awesome hatena bookmark */
.fa-hatena:before {
    content: "B!";
    font-family: Verdana;
    font-weight: bold;
    width: 100%;
    margin-bottom: 5%;
}
</style>
