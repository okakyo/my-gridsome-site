
<template lang="pug">
    blog-base(blog-title="ブログ一覧" :blogPath="blogPath")
        template(v-slot:blogContent)
            div(v-for="{node} in $static.allDoc.edges" :key="node.title")
                title-card.pa-2(:card="node")

</template>
<static-query>
    query {
        allDoc{
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
</static-query>
<script>

    import titleCard from '../components/molecules/cards/titleCard.vue'
    import rightSidebar from '../components/templates/Sidebar/rightSidebar.vue'
    import BlogBase from "../components/templates/blogBase";
    export default {
        name: 'blog',
        components:{BlogBase, titleCard,rightSidebar},
        data() {
            return {
                blogPath:[
                    {
                        text: 'Home',

                        href: '/',
                    },
                    {
                        text: 'Blog',

                        href: '/blog',
                    },
                ]
            }
        },
        metaInfo: {
            title: 'Blog'
        },
    }
</script>

<style>

</style>
