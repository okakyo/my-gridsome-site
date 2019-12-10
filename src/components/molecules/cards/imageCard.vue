<template lang="pug">
    .image-card
        v-hover
            template(v-slot:default="{ hover }" v-for="card in cardInfo")
                v-card(
                    outlined :href="card.Id"
                    :elevation="hover ? 12 : 2"
                )
                    v-card-text
                        v-img(:src="card.imgURL")
                        v-divider
                        v-card-title {{card.title}}

</template>

<script >
import Vue from 'vue';
export default {
    name: 'imageCard',
    data() {
        return {
            baseURL:'/',
            cardInfo: [{
                title: '例',
                imgURL: "/m_e_others_500.png",
                Id: 1,
            }]
        }
    },
    
};
</script>

<style scoped>

</style>
