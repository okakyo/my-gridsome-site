<template lang="pug">
    .right-sidebar
        v-list(dense nav link)
            v-list-item-title.mx-1 タグ一覧
            v-divider.mb-4.mt-1
            v-list-item.grey.lighten-3.text--white(:to="'/blog/'+node.tag" v-for="{node} in $static.allDoc.edges")
                v-list-item-title {{node.tag}}
        v-list(nav)
            v-list-item-title.mx-1 最新記事
            v-divider
            v-list-item(three-line)
                v-list-item-title  例題１
            v-divider.mx-4


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
