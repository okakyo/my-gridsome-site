<template lang="pug">
    blog-base(blog-title="タグ一覧")
        template(v-slot:blogContent)
            v-card.pa-8(outlined min-height="50%" )
                v-card-content
                    v-chip-group(column multiple)
                        v-chip(outlined v-for="tag in organizedTag" :key="tag") {{tag}}

</template>
<static-query>
    query{
        tagAll:allDoc {
            edges {
                node {
                    tags {
                        id
                        path
                    }
                }
            }
        }
    }
</static-query>
<script>
    import Vue from 'vue'
    import BlogBase from "../components/templates/blogBase";
    export default Vue.extend({
        name: "tag",
        metaInfo: {
            title: 'Blog'
        },
        components:{BlogBase},
        computed:{
            organizedTag(){
                let  responseArray=[];
                this.$static.tagAll.edges
                    .map(e=>e.node)
                    .map(e=>e.tags)
                    .map(e=>{
                        e.forEach(x=>{
                            responseArray.push(x.id);
                        })
                    });

                return responseArray.filter((e,x,self)=>{
                    return self.indexOf(e)===x;
                }).slice(0,5);



            }
        },
    })
</script>

<style scoped>

</style>
