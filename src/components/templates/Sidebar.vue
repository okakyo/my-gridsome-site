<template lang="pug">
    v-navigation-drawer.grey.lighten-4(app  clipped  right :temporary="$vuetify.breakpoint.mdAndDown") 
        v-list
            v-list-item
                v-list-item-title
                    h2(style="display:inline;") {{$page.doc.title}}
        v-divider
        v-list(dense flat)
            v-list-item-group(dense color="primary"  v-for="{ node }  in $static.allDoc.edges" :key="node.title" active-class)
                v-list-item(:to="heading.anchor" :ref="heading.anchor" v-if="node.title==$page.doc.title" v-for="heading in node.headings" :key="heading.value") 
                    v-list-item-title {{heading.value}}
                

                    
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
