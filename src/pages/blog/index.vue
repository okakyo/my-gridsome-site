<template lang="pug">
    Layout
        v-container.white
            v-layout(row wrap).ma-2
                v-flex(xs12 md6  v-for="{node} in $static.allDoc.edges")
                    title-card.pa-2(:card="node")

</template>
<static-query>
query {
    allDoc {
        edges {
            node {
                title
                path 
                date
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