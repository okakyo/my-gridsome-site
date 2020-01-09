<template lang="pug">
    Layout
        v-container.white
            .pa-3#document-title
                h1.text-center {{blogTitle}}
                v-divider
            v-layout(row wrap).ma-2
                v-flex.ma-3(xs12 md8)
                    slot(name="blogContent")
                v-flex.ma-3(md3)
                    v-card.mt-2(outlined)
                        v-card-text
                            right-sidebar
                v-btn(color="error" @click="$vuetify.goTo('#document-title')")(fab bottom right fixed)
                    v-icon(large) mdi-chevron-up
    
</template>

<script >

    import titleCard from '../molecules/cards/titleCard.vue'
    import rightSidebar from '../templates/Sidebar/rightSidebar.vue'
    export default {
        name: "blogBase",
        props:['blogTitle','blogContent'],
        components:{titleCard,rightSidebar},
        metaInfo: {
            title: 'BlogBase'
        },
    }
</script>

<style scoped>

</style>
