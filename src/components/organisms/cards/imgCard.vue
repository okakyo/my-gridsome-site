<template lang="pug">
    v-card(outlined)
        v-img(:lazy-src="work.imgURL" :src="work.imgURL" height="200px"  loading="lazy")
        v-card-title.headline--title
            h4 {{work.title}}

        v-divider
        v-card-actions
            v-spacer
            v-btn(icon :href="work.GitHub")
                v-icon mdi-github-box
            v-btn(icon :href="work.hrefURL")
                v-icon mdi-logout

</template>
<script>
    export default {
        name:"imgCard",
        props: {
            work:""
        }
    }

</script>
<style></style>
