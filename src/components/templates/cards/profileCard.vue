<template lang="pug">
    article-card(title="Profile")
        template(v-slot:content)  
            card-content(:title="title",:subTitle="subTitle",:imgUrl="image",:imgSize="imgSize")
            v-divider
            v-layout(justify="center")
                // Twitter, Facebook, Qiita, GitHub
                v-btn.ma-3(icon v-for="icon in snsIcons" :key="icon.title" :href="icon.href")
                    v-avatar
                        v-img(:src="icon.url" loading="lazy" :lazy-src="icon.url")

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
            title: "Oka Kyohei",
            subTitle: "0622okakyo@gmail.com",
            image: "/IMG_1267.jpeg",
            imgSize:80,
            snsIcons:[
                {title:"Twitter",url:"https://gyazo.com/27efa615afe6bbdfabc1bffc9daaf15b/thumb/1000",href:"https://twitter.com/31415O_Kyo"},
                {title:"Facebook",url:"https://cdn.worldvectorlogo.com/logos/facebook-3.svg",href:"https://www.facebook.com/profile.php?id=100029061574071"},
                {title:"GitHub",url:"https://cdn.worldvectorlogo.com/logos/github-1.svg",href:"https://github.com/okakyo"},
                {title:"Qiita",url:"https://gyazo.com/43ef3dfee7b402b1582db2ce241731f5/thumb/1000",href:"https://qiita.com/0622okakyo"},
            ]
        }
    }
}
</script>