<template lang="pug">

                    
</template>

<static-query>
query {
    allDoc {
        edges {
            node {
                title
                path 
                headings{
                    value 
                    anchor
                }
            }
        }
    }
}
</static-query>

<page-query>
query ($path:String!){
    doc:doc(path:$path) {
        title
        path
    }
}
</page-query>

<script>
export default {
    name:'sidebar',
    props:{
    },
    
}
</script>
<style scoped>
     .v-list-item {
        min-height:35px;
        font-size: 12px;
    }
</style>
