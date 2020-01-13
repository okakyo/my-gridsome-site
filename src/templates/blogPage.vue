<template lang="pug">
    blog-base
        template(v-slot:blogContent)
            v-layout(row wrapper)
                v-flex(xs12 md6 lg4 v-for="{node} in $static.allDoc.edges" :key="node.title")
                    title-card(:card="node")

</template>
<static-query>
    query {
        allDoc{
            edges {
                node {
                    title
                    path
                    date
                    thumbnail
                    tags {
                        id
                    }
                }
            }
        }

    }
</static-query>
<script lang="ts">
    import Vue from 'vue'
    import BlogBase from "../components/templates/blogBase";
    export default Vue.extend({
        name: "blogPage",
        components:{
            BlogBase
        }
    })
</script>

<style scoped>

</style>
