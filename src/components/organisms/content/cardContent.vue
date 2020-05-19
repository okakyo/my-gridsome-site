<template lang="pug">
    v-card-text
        v-row
            v-flex(xs12 md5 )
                v-row(justify="space-around")
                    v-avatar(:size="imgSize" :tile="isLogo")
                        v-img(:src="imgUrl" :lazy-src="imgUrl" loading="lazy")
                    
            v-flex(xs12 md10 )
                v-list
                    v-card-title.headline--title
                        h4 {{title}}
                    v-card-subtitle {{subTitle}}
                    slot(name="detail")
</template>
<script>
export default {
    name: 'cardContent',
    props:{
        isLogo:{
            type:Boolean,
            default:false
        },
        isRow: {
            type:Boolean,
            default: false 
        },
        title:"", 
        subTitle:"",
        imgSize:{
            Number,
            default:60
        },
        imgUrl:{
            type:String,
            default: '/index/util/noimage.png'
        },
    }
    
    
}
</script>

<style>

</style>