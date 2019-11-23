<template lang="pug">
  Layout() 
    v-parallax(src="/home-office-2452806_1920.jpg")
      v-row(justify="center" align="center")
          h1 OkaKyo's Portfolio
    v-container
      v-layout.pa-2(row)
        v-flex(xs12 md4 lg3)
          profile-card
        v-flex(xs12 md8 lg9)
          career-card
      v-layout.pa-2
        v-flex(xs12)
          ability-card
      v-layout.pa-2
        v-flex(xs12)
          works-card
          
</template>
<static-query>

</static-query>
<script>


import cardContent from '../components/organisms/content/cardContent.vue'
import profileCard from '../components/templates/cards/profileCard.vue'
import careerCard from '../components/templates/cards/careerCard.vue'
import abilityCard from '../components/templates/cards/abilityCard.vue'
import worksCard from '../components/templates/cards/worksCard.vue'
export default {
  metaInfo: {
    title: 'Portfolio'
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
