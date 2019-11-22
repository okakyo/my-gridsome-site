<template lang="pug">
    v-navigation-drawer(app  clipped  right :temporary="$vuetify.breakpoint.mdAndDown") 
        v-list(nav dense)
            v-list-item-group
                v-list-item( v-for="i in 5" :key="i")
                    v-list-item-title permanent
</template>
<script>
export default {
    name:'Sidebar',
    props:{
    },
    
}

</script>