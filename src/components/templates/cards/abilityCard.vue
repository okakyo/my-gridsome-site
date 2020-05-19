<template lang="pug">
    article-card(title="Ability")
        template(v-slot:content)
            v-layout(row wrap)
                v-flex(xs12 md4 lg3 v-for="ability in sortedByRating" :key="ability.title")
                    v-card.ma-3
                        card-content.pa-5(:title="ability.title", :imgUrl="ability.imgURL" :isLogo="isLogo")
                            template(v-slot:detail)
                                v-rating(:value="ability.rating" half-increments background-color="yellow darken-2" color="yellow darken-2" readonly small)

</template>

<script>

import cardContent from '../../../components/organisms/content/cardContent.vue'
import articleCard from '../../../components/organisms/cards/articleCards.vue'
export default {
    name: "abilityCard",
    components:{
        cardContent,articleCard,
    },
    computed:{
        sortedByRating(){
            return this.languageAbility.sort((a,b)=>{
                 return (a.rating < b.rating) ? 1 : (a.rating > b.rating) ? -1 : 0;
            })
        }
    },
    data:function(){
        return{
            isLogo:true,
            
            languageAbility:[
                {
                 title: "Python",
                 detail:"",
                 rating:4,
                 imgURL:"/index/ability/Python-logo-notext.svg",
                },
                {
                 title: "JavaScript",
                 detail:"",
                 rating:4,
                 imgURL:"/index/ability/Unofficial_JavaScript_logo_2.svg",
                },
                {
                 title: "TypeScript",
                 detail:"",
                 rating:4,
                 imgURL:"/index/ability/ts.png",
                },
                {
                 title: "Golang",
                detail:"",
                 rating:3,
                 imgURL:"/index/ability/go-logo_blue.png",
                },
                {
                 title: "Java",
                 detail:"",
                 rating:2,
                 imgURL:"/index/ability/jee-3.svg",
                },
                {
                 title: "C/C++",
                 detail:"",
                 rating:1,
                 imgURL:"/index/ability/c.svg",
                },
                {
                 title: "Ruby",
                 detail:"",
                 rating:1,
                 imgURL:"/index/ability/header-ruby-logo.png",
                },
                {
                 title: "Node.js/Express",
                 detail:"",
                 rating:5,
                 imgURL:"data:image/png;base64,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",
                },{
                 title: "Vue",
                 detail:"",
                 rating:4,
                 imgURL:"/index/ability/Vue.png",
                },
                {
                 title: "React",
                 detail:"",
                 rating:4,
                 imgURL:"/index/ability/react.svg",
                },
                {
                 title: "Angular",
                 detail:"",
                 rating:3,
                 imgURL:"/index/ability/Angular_full_color_logo.svg.png",
                },
                {
                 title: "Flask",
                 detail:"",
                 rating:3,
                 imgURL:"/index/ability/1c2437c139969ae8e4100b477fb824f1.svg",
                },
                {
                 title: "Django",
                 detail:"",
                 rating:3,
                 imgURL:"/index/ability/4aGjtNQv.png",
                },
                {
                 title: "Spring Boot",
                 detail:"",
                 rating:3,
                 imgURL:"/index/ability/spring-3.svg",
                },
                {
                 title: "Ruby on Rails",
                 detail:"",
                 rating:2,
                 imgURL:"/index/ability/rails.svg",
                },
            ]
        }
    }
}
</script>