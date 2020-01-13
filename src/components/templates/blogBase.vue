<template lang="pug">
    Layout
        v-container.white
            .pa-3#document-title
                h1.text-center {{blogTitle}}
                v-divider
            v-breadcrumbs.ma-1(:items="blogPath" large)
                template(v-slot:item="{ item }")
                    v-breadcrumbs-item(:href="item.href" :disabled="item.href===$route.path")
                        h4 {{item.text}}
            v-layout(row wrap).ma-2
                v-flex.pa-3(xs12 md8 lg9)
                    slot(name="blogContent")

                v-flex.pa-3(md4 lg3)
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
        props:['blogTitle','blogContent','blogPath'],

        components:{titleCard,rightSidebar},

    }
</script>

<style scoped>

</style>
