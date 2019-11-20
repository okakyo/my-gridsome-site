<template lang="pug">
    article-card(title="Career")
        template(v-slot:content)
            v-layout(row wrap)
                v-flex.pa-2(xs12 md6 lg4  v-for="company in workedCompanyInfo" :key="company.name")
                    card-content(:imgUrl="company.logoUrl",:title="company.name",:subTitle="company.date")
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
                
                {logoUrl:"/yahoo-logo.jpg",
                 name:"Yahoo Japan",
                 date:"2019年 8月 19日 ~30 日"
                },
                {logoUrl:"/600px-Teamlab_logo_RGB_color.png",
                 name:"Team Lab",
                 date:"2019年 8月 19日 ~30 日"
                },
                {logoUrl:"/icon-Logly.png",
                 name:"Logly",
                 date:"2019年 8月 5日 ~9 日"
                },
                {logoUrl:"",
                 name:"dotStar",
                 date:"2019年 4月~ "
                },
            ]
        }
    }
}
</script>
                