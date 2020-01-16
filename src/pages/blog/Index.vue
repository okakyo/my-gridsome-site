
<template lang="pug">
    blog-base(blog-title="ブログ一覧" :blogPath="blogPath" :page="$page.doc.pageInfo")
        template(v-slot:blogContent)

            div(v-for="{node} in $page.doc.edges" :key="node.title")
                title-card.pa-2(:card="node")
            Pager.v-pagination(:info="$page.doc.pageInfo" linkClass="v-pagination v-pagination__item")


</template>
<page-query>
    query Posts($page:Int) {
        doc:allDoc(perPage:5,page:$page) @paginate{
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
                    description
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
       
        metaInfo: {
            title: 'Blog'
        },
    }
</script>

<style scoped>
    a.v-pagination__item {
        padding-right:0;
    }
    .active {
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
    }
    .active--exact {
        background-color: #1976d2 !important;
        border-color: #1976d2 !important;
        color:#fff;
        padding-right:0;
    }
</style>
