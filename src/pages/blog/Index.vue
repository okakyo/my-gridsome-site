
<template lang="pug">
    blog-base(blog-title="ブログ一覧" :blogPath="blogPath" :page="$page.doc.pageInfo")
        template(v-slot:blogContent)

            div(v-for="{node} in $page.doc.edges" :key="node.title")
                title-card.pa-2(:card="node")

            v-pagination(
                v-model="pageNow"
                :length="$page.doc.pageInfo.totalPages"
                :total-visible="7"
                @click="location.href=pageNow"
                )

</template>
<page-query>
    query Posts($page:Int) {
        doc:allDoc(perPage:3,page:$page) @paginate{
            totalCount
            pageInfo{
                totalPages
                currentPage
                isFirst
                isLast

            }

            edges {
                node {
                    title
                    path
                    date
                    thumbnail
                    tags {
                        id
                        }
                }
            }
        }

    }
</page-query>
<script>

    import titleCard from '../../components/molecules/cards/titleCard.vue'
    import BlogBase from "../../components/templates/blogBase";
    import {Pager} from 'gridsome'

    export default {
        name: 'blog',
        components:{BlogBase, titleCard,Pager},

        data() {
            return {
                pageNow:0,
                blogPath:[
                    {
                        text: 'Home',
                        href: '/',

                    },
                    {
                        text:"Blog",
                        href:"/blog",

                    }

                ]
            }
        },
        mounted(){
          this.pageNow=this.$page.doc.pageInfo.currentPage;
        },
        metaInfo: {
            title: 'Blog'
        },
    }
</script>

<style>

</style>
