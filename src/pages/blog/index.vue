<template lang="pug">
    Layout
        v-container.white
            .pa-3
                h1 ブログ記事
                v-divider
            v-layout(row ).ma-2
                v-flex.ma-3(xs12 md8 )
                    div(v-for="{node} in $static.allDoc.edges" :key="node.title")
                        title-card.pa-2(:card="node")
                v-divider(vertical)
                v-flex.ma-3(md3)
                    p こんにちは

</template>
<static-query>
query {
    allDoc {
        edges {
            node {
                title
                path 
                date
                tag

            }
        }
    }

}
</static-query>
<script>
import titleCard from '../../components/molecules/cards/titleCard.vue'
export default {
    name: 'blog',
    components:{titleCard},
    metaInfo: {
        title: 'Blog'
  },
}
</script>

<style>

</style>
