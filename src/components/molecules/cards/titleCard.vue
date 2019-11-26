<template lang="pug">
    .image-card
        v-hover
            template(v-slot:default="{ hover }" )
                v-card(
                    outlined :href="card.path"
                    :elevation="hover ? 12 : 2"
                )
                    v-card-text
                        v-card-title.justify-center
                            h2 {{card.title}}
                    v-card-subtitle {{card.date |moment}}

</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'titleCard',
    props:{
        card:""
    },

    data() {
        return {
            baseURL:'/',
            cardInfo: [{
                title: '例',
            }]
        }
    },
    filters: {
        moment: function (date) {
            const datetime=new Date(date)
            return `${datetime.getFullYear()}/${datetime.getMonth()+1}/${datetime.getDate()}`;
        }
    }
});
</script>

<style scoped>

</style>
