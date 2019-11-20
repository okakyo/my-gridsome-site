<template lang="pug">
    article-card(title="Works")
        template(v-slot:content)
            v-layout(row wrap)
                v-flex.pa-2(xs12 md6 lg4  v-for="i in 10" :key="i")
                    cardContent
</template>
<script>

import cardContent from '../../../components/organisms/content/cardContent.vue'
import articleCard from '../../../components/organisms/cards/articleCards.vue'
export default {
    name:'workCard',
    components:{
        cardContent,articleCard,
    },
}
</script>