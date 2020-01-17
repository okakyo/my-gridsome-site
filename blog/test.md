---
title: Gridsome で ブログを制作した話  
tags: 
  - プログラミング
  - JavaScript
  - Vue.js
slugs: gridsome-blog  
description: >-
  こんにちは、おかきょーです。今回は、Gridsome を利用してポートフォリオ兼ブログとしての機能をもつサイトを作ってみました。Netlifyを利用して、無料でサイトを公開、運用する方法を書いて行きたいと思います。  
thumbnail: /uploads/coffee-2737047_640.min.jpg  
date: 2019-11-26T20:15:41.251Z
---

## Gridsome とは何か
Gridsome は、Vue.js をベースした静的サイトを構築するためのフレームワークです。



## 事前準備

今回、Node.js を利用して 構築していきます。

今回のアプリを構築するにあたり、使用したライブラリは次の通りです。

- #### Gridsome
- #### Vuetify
- #### Pug 
- #### Netlify CMS etc... 

まず、npm を利用して環境を構築していきます。

``` bash
npm install -g gridsome 
```
インストールが完了したら、
```bash
gridsome create new-site 
```
と入力して実行します。これにより、Gridsome の開発できる環境が整いました。

## Pug を有効にする

私は、Vue で構築するにあたり、Pug が使えるように設定しています。
Pug とは、AltHTML の一つの言語で、したの例のように、インテントによってHTML の要素を入れ子の状態に
してくれるのが特徴です。

例: HTML で実装した場合
```html
<div class="title-head">
  <h1>
    Hello World
  </h1>
</div>
```
例：Pugで実装した場合
```pug
.title-head
  h1 Hello World
```
 普通のHTMLと比べて、コードの量が少なくなるだけでなく、各要素が終わりであることを示すために、"</(要素名)>" を書く必要がないために修正し忘れにくくしてくれます。

使えるようにするには、
```bash 
npm install -save-dev pug @gridsome/plugin-pug
```
とした上で、**gridsome.config.js** の **plugin** を次の文を書き足します。
```
plugins: [
    'gridsome-plugin-pug',
]
```

## Markdown でブログ記事を管理する
このGridsome は、Markdown ファイルで記事の保存、GraphQL を通して記事の読み込みを行います。
マークダウンを利用して記事を利用するために、次のライブラリをインストールします。


```bash
npm install --save @gridsome/source-filesystem @gridsome/transformer-remark
npm install --save-dev @gridsome/remark-prismjs
```

そして、gridsome.config.js にて **"plugins"**　で次のように設定します。

```js

plugins: [
    'gridsome-plugin-pug',
    // 以下を追加
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

この TypeName では、**templates ファイル** で設定した **Doc.vue** をもとにマークダウンが表示されます。

Doc.vue は次のように実装します。
```pug
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

以上の設定により、読み込んだ Markdown ファイルをブログ記事として公開することができるようになりました。

## Netlify CMS を追加する

記事を編集するにあたり、Git を利用して記事を管理することもできますが、今回はNetlify CMS を利用して記事編集ができるようにしたいと思います、

Netlify CMS については次の記事を参照してください。

このCMS が使えるようにするには、npm にて、次のコマンドを実行します。

```bash
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
    'gridsome-plugin-pug' 
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


