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
                            v-flex(xs12 sm6 md5  lg4).pa-8
                                v-img.ml-2(height="100%" width="100%" :src="card.thumbnail" :lazy-src="card.thumbnail" loading="lazy")
                            v-flex(xs12 sm6 md7 lg8)
                                v-card-text
                                    v-card-title.py-1 
                                        h3 {{card.title}}
                                    v-list(three-line)
                                        v-list-item
                                            v-list-item-content
                                                v-list-item-subtitle {{card.description}}
                                    v-chip-group(column multiple)
                                        v-chip.mb-2(outlined v-for="tag in card.tags" :key="card.tags.id" ) {{tag.id}}
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
            const datetime=new Date(date);
            return `${datetime.getFullYear()}/${datetime.getMonth()+1}/${datetime.getDate()}`;
        }
    }
});
</script>

<style scoped>

</style>
