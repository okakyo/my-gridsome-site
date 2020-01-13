<template lang="pug">
    blog-base(blog-title="の一覧")
        template(v-slot:blogContent)

            div(v-for="article  in articles" :key="article.title")
                title-card.pa-2(:card="article")

</template>
<page-query>
query($id: ID!) {
    tagPage(id:$id){
        belongsTo {
            edges {
                node {
                    ...on Doc {
                        title
                        path 
                        date
                        thumbnail
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
export default {
    name: 'blog',
    components:{BlogBase, titleCard},
    metaInfo: {
        title: 'Blog'
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
