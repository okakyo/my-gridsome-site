<template lang="pug">
    .image-card
        v-hover
            template(v-slot:default="{ hover }" )
                
                v-card(
                    outlined :href="card.path"
                    :elevation="hover? 5: 0"
                )
                    v-container
                        v-layout(row wrap)
                            v-flex(xs4).pa-8
                                v-img.ml-2(height="100%" width="100%" :src="card.thumbnail")
                            v-flex(xs8)
                                v-card-text
                                    v-card-title.justify-center
                                        h2 {{card.title}}
                                    v-chip.mb-2(outlined) {{card.tag}}
                    v-divider
                    v-card-subtitle {{card.date |moment}} 更新

</template>

<script >
import Vue from 'vue';
export default Vue.extend({
    name: 'titleCard',
    props:{
        card:{
            type:Object
        }
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
