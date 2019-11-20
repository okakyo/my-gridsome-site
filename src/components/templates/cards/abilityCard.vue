<template lang="pug">
    article-card(title="Ability")
        template(v-slot:content)  
            card-content(:title="title",:subTitle="subTitle",:imgURL="imgURL")

</template>

<script>

import cardContent from '../../../components/organisms/content/cardContent.vue'
import articleCard from '../../../components/organisms/cards/articleCards.vue'
export default {
    name: "abilityCard",
    components:{
        cardContent,articleCard,
    },
    data:function(){
        return{
            title: "Name: Oka Kyohei",
            subTitle: "0622okakyo@gmail.com",
            imgURL: ""
        }
    }
}
</script>