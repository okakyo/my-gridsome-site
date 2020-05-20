<template lang="pug">
    div
        v-card.my-3.mx-7
            v-card-title
                v-spacer
                h1.pa-1 {{title}}
                v-spacer
        v-card(flat).ma-3
            v-card-text.grey.lighten-4
                slot(name="content")
</template>

<script >

import Vue from 'vue';
export default {
    name: 'articleCard',
    props: {
        title: "",
    },

};
</script>

<style scoped>

</style>
