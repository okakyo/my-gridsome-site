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
                
                {logoUrl:"https://s.yimg.jp/c/logo/f/2.0/news_r_34_2x.png",
                 name:"Yahoo Japan",
                 date:"2019年 8月 19日 ~30 日"
                },
                {logoUrl:"https://s.yimg.jp/c/logo/f/2.0/news_r_34_2x.png",
                 name:"Yahoo Japan",
                 date:"2019年 8月 19日 ~30 日"
                },
                {logoUrl:"https://s.yimg.jp/c/logo/f/2.0/news_r_34_2x.png",
                 name:"Yahoo Japan",
                 date:"2019年 8月 19日 ~30 日"
                },
                {logoUrl:"https://s.yimg.jp/c/logo/f/2.0/news_r_34_2x.png",
                 name:"Yahoo Japan",
                 date:"2019年 8月 19日 ~30 日"
                },
            ]
        }
    }
}
</script>
                