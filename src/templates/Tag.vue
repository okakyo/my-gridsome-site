<template lang="pug">
    Layout
        v-container.white
            .pa-3
                h1 ブログ記事
                v-divider

            v-layout(row ).ma-2
                v-flex.ma-3(xs12 md8 )
                    div(v-for="article  in articles" :key="article.title")
                        title-card.pa-2(:card="article")
                v-flex.ma-3(md3)
                    v-card.mt-2(outlined)
                        v-card-text
                            right-sidebar

</template>
<page-query>
query($id: String!) {
    tag(id:$id){
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
import rightSidebar from '~/components/templates/Sidebar/rightSidebar.vue'
export default {
    name: 'blog',
    components:{titleCard,rightSidebar},
    metaInfo: {
        title: 'Blog'
    },
    computed:{
        articles(){
             return this.$page.tag.belongsTo.edges.map(e => e.node);
        }
    }
}
</script>

<style>

</style>
