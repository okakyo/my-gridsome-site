<template lang="pug">
    article-card(title="Ability")
        template(v-slot:content )
            v-layout(row wrap)
                v-flex(xs12 md4 lg3 v-for="i in 10" :key="i")
                    card-content(:title="title",:subTitle="subTitle",:imgURL="imgURL" )

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
            imgURL: "",
            languageAbility:[
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 imgURL:"",
                }
            ]
        }
    }
}
</script>