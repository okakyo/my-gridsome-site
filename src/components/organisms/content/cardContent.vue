<template lang="pug">
    v-card-text
        v-layout
            v-row(justify="space-around")
                v-avatar(justify="space-around" :size="imgSize")
                    v-img(:src="imgUrl")
                v-card-title.headline--title
                    h4 {{title}}
                v-card-subtitle {{subTitle}}
                slot(name="detail")
</template>
<script>
export default {
    name: 'cardContent',
    props:{
        title:"", 
        subTitle:"",
        imgSize:{
            Number,
            default:50
        },
        imgUrl:{
            type:String,
            default: '/m_e_others_500.png'
        },
    }
    
    
}
</script>

<style>

</style>