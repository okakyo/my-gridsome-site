<template lang="pug">
    v-card.ma-3
        v-card-title
            v-spacer
            h1.pa-1 {{title}}
            v-spacer
        v-divider
        v-card-text
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
