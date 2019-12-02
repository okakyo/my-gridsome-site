<template lang="pug">
    v-list
        v-list-item-title.ma-3 tags
        v-divider
        v-list-item(v-for=" {node} in $static.allDoc.edges" :key="node.tag")
            v-list-title  {{node.tag}}

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
