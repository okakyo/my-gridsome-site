<template lang="pug">
    v-list(dense nav link)
        v-list-item-title.ma-3 タグ一覧
        v-divider
        v-list-item-group
            v-list-item(:to="'/blog/'+node.tag" v-for="{node} in $static.allDoc.edges")
                v-list-item-title {{node.tag}}

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
