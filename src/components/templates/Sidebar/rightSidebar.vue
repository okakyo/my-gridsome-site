<template lang="pug">
    .right-sidebar
        v-list(dense nav link flat)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white タグ一覧
            
            v-list-item-group(v-for="tag in organizedTag" :key="tag.id")
                v-list-item(:to="/tag/+tag" flat)
                    v-list-item-title {{tag}}
                    v-list-item-icon
                        v-icon(color="primary lighten-1") mdi-chevron-right
                v-divider
            v-list-item(to="/" flat)
               v-list-item-title.text--primary その他
        v-list(nav flat)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white 最新記事
            v-list-item-group(v-for="{node} in $static.recentTitleAll.edges" :key="node.title")
                v-layout
                    v-flex(xs3)
                        v-list-item(three-line :to="node.path")
                        p.mt-1  {{node.title}}
                    v-flex(xs9)
                        v-img(:src="node.thumbnail" width="100%" height="100%")

                v-divider.pb-2


</template>

<static-query>
    query {
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
        recentTitleAll:allDoc(limit:5) {
            edges {
                node {
                    title
                    path
                    thumbnail
                    date
                }
            }
        }
    }
</static-query>

<script>
    import Vue from 'vue';
import { func } from 'prop-types';

    export default {
        name: "rightSidebar",
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
        }
    }

</script>

<style scoped>

</style>
