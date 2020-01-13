---
title: Gridsome で ブログを制作した話
tags: 
  - プログラミング
  - JavaScript
  - Vue.js
slugs: gridsome-blog
description: >-
  こんにちは、おかきょーです。今回は、Gridsome を利用してポートフォリオ兼ブログとしての機能をもつサイトを作ってみました。このサイトについてのGitHub は次のページにありますので、気になった方はこちらのリポジトリをぜひフォークしてみて動かしてみてください。
thumbnail: /uploads/coffee-2737047_640.jpg
date: 2019-11-26T20:15:41.251Z
---

## Gridsome とは何か
Gridsome は、Vue.js をベースした静的サイト構築するためのフレームワークです。

これまでのVue.js を利用してのブログサイトを公開するのであれば、AWS(Amazon Web Service) や GCP(Google Cloud Platform )などのSQL が用意されているサーバーを借りてブログサイトを運用する必要があります.



## 事前準備

今回、Node.js を利用して 構築していきます。

今回のアプリを構築するにあたり、使用したライブラリは次の通りです。

- Gridsome
- Vuetify
- Pug 
- Netlify CMS etc... 

npm を利用して環境を構築して行きます。

``` bash
npm install -g gridsome 
```
次に、
```sh
gridsome create new-site 
```
と入力して実行します。これにより、アプリを構築することができます。

## Pug を有効にする



## マークダウン
このGridsome は、Markdown ファイルで記事の保存、GraphQL を通して記事の読み込みを行います。
マークダウンを利用して記事を利用するために、次のライブラリをインストールします。


```sh
npm install --save @gridsome/source-filesystem @gridsome/transformer-remark
npm install --save-dev @gridsome/remark-prismjs
```

そして、gridsome.config.js にて "plugins"　で次のように設定します。

```js

plugins: [
    // [ 省略 ]
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md', // どのディレクトリのマークダウンを読み込むかを設定
        route: "/blog/article/:slugs", // どのURL で公開するか
        typeName: 'Doc', 
        remark: {
          plugins: [
            '@gridsome/remark-prismjs' // どのCSS を適用させるか
          ]
        }
      }
    }
]
```

この TypeName では、*templates ファイル* で設定した *Doc.vue* をもとにマークダウンが表示されます。

```vue
<template lang="pug">
  Layout
    v-container
      v-layout(row wrap).ma-2
        v-flex.ma-3.white(xs12 md10 lg8)
          h2#document-title.blog-title.pa-2 {{ $page.doc.title }}
          v-divider
          .markdown(v-html="$page.doc.content")
        v-flex.ma-3(md1 lg3)
          right-sidebar
        v-btn(color="error")(fab bottom right fixed)
            v-icon(large) mdi-chevron-up

     
</template>

<page-query>
query Doc ($path: String!) {
  doc: doc (path: $path) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    content
  }
}

</page-query>
<script>
import rightSidebar from '../components/templates/Sidebar/rightSidebar.vue'
export default {
  components:{
    rightSidebar
  },
  
  metaInfo() {
    return {
      title: this.$page.doc.title,
      meta: [
        { key: 'description', name: 'description', content: this.$page.doc.description }
      ]
    }
  }
}
</script>

//[省略]

```

以上で、マークダウンファイルの読み込むことができます。




## Netlify CMS を追加する

```sh
npm install --save gridsome-plugin-netlify-cms
```

CMS を有効にするには、src ファイルないに, admin ディレクトリを構築します。
その中に、config.yml, index.html, index.js を次のように設定します。

- config.yml

```yaml

backend:
  name: github
  repo: okakyo/my-gridsome-site

media_folder: "static/uploads"
public_folder: "/uploads"

publish_mode: editorial_workflow 

collections:
  - name: "blog"
    label: "Blogs"
    folder: "blog"
    create: true
    slug: "blog/{{fields.slugs}}"
    identifier_field: title
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Tag", name: "tags", widget: "list"}
      - {label: "Slug", name: "slugs", widget: "string"}
      - {label: "img", name: "thumbnail",widget: "image"}
      - {label: "Publish Date", name: "date", widget: "date"}
      - {label: "Content", name: "body", widget: "markdown"}

```

- index.html

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Netlify CMS</title>
</head>
<body>
  <script src="index.js" type="module"></script>
</body>
</html>
```

- index.js
```js
import CMS from "netlify-cms"
```

このファイルの設定が完了したら、 GitHub でOauth 認証を有効になるよう設定します。


## タグ機能を追加

タグ機能を有効にするには、マークダウンで編集した gridsome.config.js のplugin に以下のコードを追加してください。
下に書かれてある, "refs" の要素を設定することで、タグ機能を利用することができます。

 ```js
plugins: [
    //[ 省略] 
    
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        route: "/blog/article/:slugs",
        typeName: 'Doc',
        // こちらを追加 
        refs: {
          tags: {
            typeName: "Tag",
            route: "/tag/:id",
            create: true
          }
        },
        remark: {
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },]
```


