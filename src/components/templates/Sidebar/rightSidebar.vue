<template lang="pug">
    .right-sidebar
        v-list(dense nav link flat)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white タグ一覧
            v-chip-group(column)
                v-chip(label outlined color="primary" small v-for="tag in organizedTag" :key="tag.id" :to="/tag/+tag") {{tag}}
            
        v-list(nav flat)
            v-list-item-title.grey.lighten-3.mb-3.pa-1
                h3.text--white 最新記事
            v-list-item-group(v-for="{node} in $static.recentTitleAll.edges" :key="node.title")
                v-layout
                    v-flex(xs8)
                        v-list-item(three-line :to="node.path")
                            h4  {{node.title}}
                    v-flex.mt-5(xs4)
                        v-img(:src="node.thumbnail" :lazy-src="node.thumbnail" loading="lazy" width="100%" )
                p.text--secondary {{node.date | moment}} 日更新
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
                    })



            }
        },
        filters: {
            moment: function (date) {
                const datetime=new Date(date)
                return `${datetime.getFullYear()}/${datetime.getMonth()+1}/${datetime.getDate()}`;
            }
        }
    }

</script>

<style scoped>

</style>
