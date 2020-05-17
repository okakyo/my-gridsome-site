<template lang="pug">
    article-card(title="Career")
        template(v-slot:content)
            v-layout(row wrap)
                v-flex.pa-2(xs12 md6 lg4  v-for="company in workedCompanyInfo" :key="company.name")
                    card-content(:imgUrl="company.logoUrl",:title="company.name",:subTitle="company.date")
                        template(v-slot:detail)  
                            p {{company.works}}
                            v-divider
</template>
<script>

import cardContent from '../../../components/organisms/content/cardContent.vue'
import articleCard from '../../../components/organisms/cards/articleCards.vue'
export default {
    name:'careerCard',
    components:{
        cardContent,articleCard,
    },
    
    data(){
        return {
            workedCompanyInfo:[
                {
                 name:"dotStar",
                 date:"2019年 4月~ ",
                 works: "JavaScript による Slack Bot の開発や、決済システムの構築に従事した"
                },
               {logoUrl:"/icon-Logly.png",
                 name:"Logly",
                 date:"2019年 8月 5日 ~9 日",
                 works: "Golangで作られたサンプルの広告配信サーバーのチューニング"
                }, 
                {logoUrl:"/yahoo-logo.jpg",
                 name:"Yahoo Japan",
                 date:"2019年 8月 19日 ~30 日",
                 works: "新規アプリの開発チームに加わり、アプリ開発を行った"
                },
                {logoUrl:"/600px-Teamlab_logo_RGB_color.png",
                 name:"Team Lab",
                 date:"2019年 9月 17日 ~27 日",
                 works: "SpringBoot, Solrを利用したECサイトの検索機能を実装を経験した"
                }{
                    name:"Lead Effort",
                    date:"2020年 3月 1日 ~ ",
                    works: "Hudlook の設計、実装、改善を行った"
                },,
                
                
            ]
        }
    }
}
</script>
                