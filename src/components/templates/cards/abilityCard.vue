<template lang="pug">
    article-card(title="Ability")
        template(v-slot:content )
            v-layout(row wrap)
                v-flex(xs12 md4 lg3 v-for="ability in languageAbility" :key="ability.title")
                    card-content(:title="ability.title",:subTitle="ability.subTitle",:imgURL="ability.imgURL" )
                        template(v-slot:detail)
                            v-rating(value="4" background-color="yellow" color="yellow" readonly)
                            v-divider

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
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                {
                 title: "Python",
                 subTitle:"2017/4~",
                 rating:4,
                 imgURL:"",
                },
                

            ]
        }
    }
}
</script>