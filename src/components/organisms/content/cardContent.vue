<template lang="pug">
    v-card-text
        v-layout
            v-row(justify="space-around")
                v-avatar(justify="space-around" size="96")
                    v-img(:src="imgUrl?imgUrl:defaultImage")
                v-card-title.headline--title
                    h4 {{title}}
                v-card-subtitle {{subTitle}}
</template>
<script>
export default {
    name: 'cardContent',
    props:{
        title:"", 
        subTitle:"",
        imgUrl:""
    },
    data(){
        return {
            defaultImage:'/m_e_others_500.png',
        }
    },
    created:{
        
    }
    
}
</script>

<style>

</style>