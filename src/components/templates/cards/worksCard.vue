<template lang="pug">
    article-card(title="Works")
        template(v-slot:content)
            v-layout(row wrap)
                v-flex.pa-2(xs12 md4 lg3  v-for="i in 2" :key="i")
                    card-content
</template>
<script>

import cardContent from '../../../components/organisms/content/cardContent.vue'
import articleCard from '../../../components/organisms/cards/articleCards.vue'
export default {
    name:'workCard',
    components:{
        cardContent,articleCard,
    },
    data(){
        return {
            worksInfo:[
                {
                    title:"This Portfolio Site",
                    hrefURL:"",
                    imgURL:"",
                    description:"", 
                 },
                 {
                    title: "",
                    hrefURL:"",
                    imgURL:"",
                    description:"",
                 },
                 {
                     title:"",
                     hrefURL:"",
                     imgURL:"",
                     description:""
                 }

            ]
        }
    }
}
</script>