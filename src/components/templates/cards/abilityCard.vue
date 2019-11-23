<template lang="pug">
    article-card(title="Ability")
        template(v-slot:content)
            v-layout(row wrap)
                v-flex(xs12 md4 lg3 v-for="ability in languageAbility" :key="ability.title")
                    card-content.pa-2(:title="ability.title", :imgUrl="ability.imgURL" :isLogo="isLogo")
                        template(v-slot:detail)
                            v-rating(:value="ability.rating" half-increments background-color="yellow darken-2" color="yellow darken-2" readonly small)
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
            isLogo:true,
            
            languageAbility:[
                {
                 title: "Python",
                 
                 rating:4,
                 imgURL:"https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
                },
                {
                 title: "JavaScript",
                 
                 rating:4,
                 imgURL:"https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
                },
                {
                 title: "TypeScript",
                 
                 rating:3,
                 imgURL:"https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png",
                },
                {
                 title: "Golang",
                 
                 rating:3,
                 imgURL:"https://text.baldanders.info/images/attention/go-logo_blue.png",
                },
                {
                 title: "Java",
                 rating:2,
                 imgURL:"https://upload.wikimedia.org/wikipedia/de/e/e1/Java-Logo.svg",
                },
                {
                 title: "C/C++",
                 
                 rating:1,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/c.svg",
                },
                {
                 title: "Ruby",
                 rating:1,
                 imgURL:"https://www.ruby-lang.org/images/header-ruby-logo.png",
                },
                {
                 title: "Node.js/Express",
                 rating:5,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
                },{
                 title: "Vue",
                 
                 rating:4,
                 imgURL:"https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png",
                },
                {
                 title: "React",
                 
                 rating:3,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/react.svg",
                },
                {
                 title: "Angular",
                
                 rating:3,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/angular-icon.svg",
                },
                {
                 title: "Flask",
                 rating:3,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/flask.svg",
                },
                {
                 title: "Django",
                 
                 rating:3,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/django.svg",
                },
                {
                 title: "Spring Boot",
                 rating:3,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/spring-3.svg",
                },
                {
                 title: "Ruby on Rails",
                 
                 rating:2,
                 imgURL:"https://cdn.worldvectorlogo.com/logos/rails.svg",
                },
            ]
        }
    }
}
</script>