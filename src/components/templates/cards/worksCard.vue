<template lang="pug">
    article-card(title="Works")
        template(v-slot:content)
            v-layout(row wrap)
                v-flex.pa-2(xs12 md4 lg3  v-for="work in worksInfo" :key="work.title")
                    img-card(:work="work")
</template>
<script>

import imgCard from '../../../components/organisms/cards/imgCard.vue'
import articleCard from '../../../components/organisms/cards/articleCards.vue'
export default {
    name:'workCard',
    components:{
        imgCard,articleCard,
    },
    data(){
        return {
            worksInfo:[
                {
                    title:"ポートフォリオ",
                    hrefURL:"/",
                    imgURL:"/my-portfolio.png",
                    GitHub:"https://github.com/okakyo/gridSome", 
                 },
                 {
                    title: "飲み会提案ボット",
                    hrefURL:"https://www.line-community.me/bot_detail?botid=5baf522e851f74632343b187",
                    imgURL:"https://obs.line-scdn.net/0hSKCEp6DJDGR-PCGtgDFzM19hBwZNXhJvXFpEAlo0WlRTD0pcF1pLVlo0VgZUDR87Rg4UVTU8WgZbCEo6RB9CCw9vUgRWXA/f256x256",
                    GitHub:"https://github.com/silloi/nomikai-suggest-bot",
                 },
                 {
                     title:"危険地帯アラート",
                     hrefURL:"https://dangeralert.herokuapp.com/",
                     imgURL:"/danger-alert.png",
                     GitHub:"https://github.com/okakyo/DangerAlert"
                 }

            ]
        }
    }
}
</script>
