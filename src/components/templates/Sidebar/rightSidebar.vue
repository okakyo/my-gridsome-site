<template lang="pug">
    .right-sidebar
        v-list(dense nav link flat)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white タグ一覧
            v-list-item-group(v-for="{node} in $static.tagAll.edges" :key="node.tag")
                v-list-item(:to="'/blog/tags/'+node.tag" flat)
                    v-list-item-title {{node.tag}}
                    v-list-item-icon
                        v-icon(color="primary lighten-1") mdi-chevron-right
                v-divider
        v-list(nav flat)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white 最新記事
            v-list-item-group(v-for="{node} in $static.recentTitleAll.edges" :key="node.title")

                v-list-item(three-line :to="node.path")
                    p.mt-1(style="text-align:center")  {{node.title}}
                v-divider.pb-2


</template>

<static-query>
    query {
        tagAll:allDoc {
            edges {
                node {
                    tag
                }
            }
        }
        recentTitleAll:allDoc(limit:5) {
            edges {
                node {
                    title
                    path
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
