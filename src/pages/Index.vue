<template lang="pug">
    Layout
        v-parallax(src="/index/util/portfolio.jpg" lazy-src="/index/util/portfolio.jpg" loading="lazy")
            v-row(justify="center" align="center")
                h1 OkaKyo's Portfolio
        v-container
            v-layout.pa-2(row)
                v-flex(xs12 sm5 lg3)
                    profile-card
                v-flex(xs12 sm7 lg9)
                    career-card
            v-layout.pa-2
                v-flex(xs12)
                    ability-card
            v-layout.pa-2
                v-flex(xs12)
                    works-card

</template>

<script>

    import cardContent from '../components/organisms/content/cardContent.vue'
    import profileCard from '../components/templates/cards/profileCard.vue'
    import careerCard from '../components/templates/cards/careerCard.vue'
    import abilityCard from '../components/templates/cards/abilityCard.vue'
    import worksCard from '../components/templates/cards/worksCard.vue'
    export default {
        metaInfo() { 
            return {
            title: "OkaKyo's Portfolio",
            meta: [
                {name: 'twitter:card', content:"summary_large_image" },
                {name: 'twitter:site', content:"おかきょー" },
                {name:'og:type', content:"website"},
                {name: 'og:url', content:`https://okakyo.myvnc.com` },
                {name: 'og:title', content:"OkaKyo's Portfolio"},
                {name: 'og:description', content: "おかきょーのポートフォリオサイトです。" },
                {name: "og:image", content: `https://okakyo.myvnc.com/index/profile/IMG_1267.jpeg` },
                ]
            }
        },
        components:{

            profileCard,
            careerCard,
            abilityCard,
            worksCard,
        }



    }
</script>

<style>
    .home-links a {
        margin-right: 1rem;
    }
</style>
