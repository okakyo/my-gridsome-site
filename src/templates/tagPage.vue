<template lang="pug">
    blog-base(:blogPath="blogPath" :blog-title='`タグ：「 `+$page.tagPage.id+` 」の一覧`')
        
        template(v-slot:blogContent)
            
            div(v-for="article  in articles" :key="article.title")
                title-card.pa-2(:card="article")
            Pager.v-pagination(:info="$page.tagPage.belongsTo.pageInfo" linkClass="v-pagination v-pagination__item")

</template>
<page-query>
query($id: ID, $page:Int) {
    tagPage(id:$id) {
        id
        belongsTo(perPage:5,page:$page) @paginate{
            pageInfo {
                totalPages
                currentPage
                
            }
            edges {
                node {
                    ...on Doc {
                        title
                        path 
                        date
                        thumbnail
                        description
                        tags {
                            id
                            path
                        }
                    }
                }
            }
        }
    }
}
</page-query>
<script>
import titleCard from '~/components/molecules/cards/titleCard.vue'
import BlogBase from "../components/templates/blogBase";
import {Pager} from 'gridsome'
export default {
    name: 'blog',
    components:{BlogBase, titleCard,Pager},
    metaInfo: {
        title: 'Blog'
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
    this.blogPath.push({text:`タグ名：${this.$page.tagPage.id}`,href:this.$route.path})
  },
    computed:{
        articles(){
             return this.$page.tagPage.belongsTo.edges.map(e => e.node);
        }
    }
}
</script>

<style>

</style>
