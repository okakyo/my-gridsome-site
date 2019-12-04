<template lang="pug">
    .right-sidebar
        v-list(dense nav link flat)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white タグ一覧
            v-list-item-group(v-for="{node} in $static.allDoc.edges")
                v-list-item(:to="'/blog/'+node.tag" flat)
                    v-list-item-title {{node.tag}}
                    v-list-item-icon
                        v-icon(color="primary lighten-1") mdi-chevron-right
                v-divider
        v-list(nav)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white 最新記事

            v-list-item(three-line)
                v-list-item-title  例題１
            v-divider


</template>

<static-query>
    query {
        allDoc {
            edges {
                node {
                    tag

                }
            }
        }
    }
</static-query>

<script>
    import Vue from 'vue';

    export default {
        name: "rightSidebar"
    }
</script>

<style scoped>

</style>
