<template lang="pug">
    article-card(title="Profile")
        template(v-slot:content)  
            card-content(:title="title",:subTitle="subTitle",:imgUrl="image",:imgSize="imgSize")
            v-divider
            v-row.ma-2
                v-avatar
                    v-icon

</template>

<script>

import cardContent from '../../../components/organisms/content/cardContent.vue'
import articleCard from '../../../components/organisms/cards/articleCards.vue'
export default {
    name: "profileCard",
    components:{
        cardContent,articleCard,
    },
    data(){
        return{
            title: "Name: Oka Kyohei",
            subTitle: "0622okakyo@gmail.com",
            image: "/IMG_1267.jpeg",
            imgSize:96
        }
    }
}
</script>