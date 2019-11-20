<template lang="pug">
  Layout
    v-parallax(src="/home-office-2452806_1920.jpg")
      v-row(justify="center" align="center")
          h1 OkaKyo's Portfolio
    v-container
      v-layout.pa-2(row)
        v-flex(xs12 md6 lg3)
          profile-card
        v-flex(xs12 md6 lg9)
          career-card
      v-layout.pa-2
        v-flex(xs12)
          article-card(title="Ability")
            template(v-slot:content)
              card-content
              

      v-layout.pa-2
        v-flex(xs12)
          article-card(title="Works")
          
          
</template>
<static-query>

</static-query>
<script>

import articleCard from '../components/organisms/cards/articleCards.vue'
import imageCard from '../components/molecules/cards/imageCard.vue'
import cardContent from '../components/organisms/content/cardContent.vue'
import profileCard from '../components/templates/cards/profileCard.vue'
import careerCard from '../components/templates/cards/careerCard.vue'
export default {
  metaInfo: {
    title: 'Portfolio'
  },
  components:{
    imageCard,
    articleCard,
    cardContent,
    profileCard,
    careerCard,
  }
  


}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
