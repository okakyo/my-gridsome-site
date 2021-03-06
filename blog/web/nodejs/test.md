---
title: Gridsome で ブログを制作した話  
tags: 
  - プログラミング
  - JavaScript
  - Vue.js
slugs: gridsome-blog  
description: >-
  こんにちは、おかきょーです。今回は、Gridsome を利用してポートフォリオ兼ブログとしての機能をもつサイトを作ってみました。Netlifyを利用して、無料でサイトを公開、運用する方法を書いて行きたいと思います。 
thumbnail: /uploads/coffee-2737047_640-min.jpg  
date: 2020-1-19T20:15:41.251Z
---

## Gridsome とは何か
Gridsome は、Vue.js で利用できる JAMStack フレームワークのひとつです。
普通のVue.js とは異なり、GraphQL を利用してブログ記事のデータを管理するため、
サーバーサイドの設計を行わずにフロントエンドの実装だけでアプリを構築することができます。

## 事前準備

今回、Node.js を利用して 構築していきます。

今回のアプリを構築するにあたり、主に使用したライブラリは次の通りです。

- **Gridsome**
- **Vuetify**
- **Pug** 
- **Netlify CMS**  

まず、npm を利用して環境を構築していきます。

``` bash
$ npm install --global @gridsome/cli
```
インストールが完了したら、

```bash
$ gridsome create new-site 
```
と入力して実行します。これにより、Gridsome の開発できる環境が整いました。

## Pug を有効にする

私は、Vue で構築するにあたり、Pug が使えるように設定しています。
Pug とは、AltHTML の一つの言語で、以下の例のように、インテントによってHTML の要素を入れ子の状態に
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

 普通のHTMLと比べて、コードの量が少なくなるだけでなく、各要素が終わりであることを示すために、"</(要素名)>" を書く必要がありません。そのため、修正し忘れることを防いでくれます。

使えるようにするには、

```bash 
$ npm install -save-dev pug gridsome-plugin-pug
```
とした上で、`gridsome.config.js` の **plugin** を次の文を書き足します。


```js 
plugins: [
    'gridsome-plugin-pug',
]
```
## Vuetify が使えるように設定する
続いて、Vuetify の設定も行います。Vuetify とは、Vue で利用できるマテリアルデザインコンポーネントフレームワークです。ボタンやテーブルといったコンポーネントがあらかじめ用意されているため、１からデザインの設計をすることなく利用できるのが特徴です。

まず、Vuetify ライブラリと、webpack を編集するライブラリををnpm からインストールします。

```bash
$ npm install --save vuetify 
$ npm install --save-dev webpack-node-externals
```

続きまして、`/src/main.js` に次のように設定します。

```js
import DefaultLayout from '~/layouts/Default.vue'

// 次のライブラリをimport します。
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import 'prismjs/themes/prism-tomorrow.css'


export default function (Vue, { router, head, isClient,appOptions }) {
  Vue.component('Layout', DefaultLayout)

  // 以下を追加

  Vue.use(Vuetify);
  appOptions.vuetify = new Vuetify({
    customVariables: ['~/assets/css/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.grey.darken4,
          accent: colors.shades.black,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  })  
}

```
最後に、`gridsome.server.js` を次のように書いて行きます。

```js
const nodeExternals = require('webpack-node-externals');

module.exports = function (api) {
  // 以下を追加
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          whitelist: [/^vuetify/,/\.css$/]
        })
      ])
    }
  })

 // [省略]
}
```

これにより、Gridsome でVuetify を使えるように設定しました。

## PurgeCSS を利用して、使われていないCSS を削除する

Vuetify はとても便利なマテリアルフレームワークですが、フレームワーク単体を使用するにはとても重くて
読み込みに時間がかかります。

そこで、PurgeCSS を利用して、使用していないCSS ファイルを削除して読み込み時間を短縮します。

```bash
$npm install --save-dev gridsome-plugin-purgecss
```

次に、PurgeCSS の詳細な設定を行います。この設定がしっかりと行われていないと、Vuetify のCSS 情報がすべて削除されてしまう
可能性があるので特に気を付けて実装する必要があります。

```js
plugins: [
   （省略）
     {
      use: 'gridsome-plugin-purgecss',
      // default options, the following will be included if you don't provide anything
      options: {
        content: [
          './src/**/*.vue',
          './src/**/*.js',
          './src/**/*.jsx',
          './src/**/*.md',
          './node_modules/vuetify/dist/vuetify.js',
          'node_modules/prismjs/**/*.js'
        ],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],

        // 以下のWhiteList の設定をしなければ、Vuetify のCSS が適用されなくなるので特に注意 !

        whitelist: ['v-application', 'v-application--wrap','layout','row','col'],
        whitelistPatterns: [
          /^v-((?!application).)*$/,
          /^theme--*/,
          /.*-transition/,
          /^justify-*/,
          /^p*-[0-9]/,
          /^m*-[0-9]/,
          /^text--*/,
          /--text$/,
        ],

        whitelistPatternsChildren: [/^v-((?!application).)*$/, /^theme--*/]
      }
    },
]

```

以上で PurgeCSS の設定を行いました。

## Markdown でブログ記事を管理する
このGridsome は、Markdown ファイルで記事の保存、GraphQL を通して記事の読み込みを行います。
マークダウンを利用して記事を利用するために、次のライブラリをインストールします。


```bash
$ npm install --save @gridsome/source-filesystem @gridsome/transformer-remark
$ npm install --save-dev @gridsome/remark-prismjs
```

そして、`gridsome.config.js` にて **plugins**　で次のように設定します。

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

`Doc.vue` は次のように実装します。


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

以上の設定により、読み込んだ Markdown ファイルをブログ記事として公開することができるようになりました。

## Netlify CMS を追加する

記事を編集するにあたり、Git を利用して記事を管理することもできますが、今回はNetlify CMS を利用して記事編集ができるようにしたいと思います、

Netlify CMS については次の記事を参照してください。

このCMS が使えるようにするには、npm にて、次のコマンドを実行します。

```bash
$ npm install --save netlify-cms gridsome-plugin-netlify-cms
```

CMS を有効にするには、src ファイルないに, admin ディレクトリを構築します。
admin ディレクトリ内に、`config.yml, index.html, index.js` を次のように設定します。

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

Netlify の管理画面で、
**"Settings" ”→ ”Identity” → ”Enable Git Gateway”** をクリックして、GitHub での認証ができるようにします。

これで、Netlify CMS を使用できるようにします。
## タグ機能を追加

タグ機能を有効にするには、マークダウンで編集した `gridsome.config.js` の**plugin** に以下のコードを追加してください。
下に書かれてある, ` refs `の要素を設定することで、タグ機能を利用することができます。

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

以上で、Gridsome を利用する際、独自に設定しなくてはならないことを書きました。  
あとは、Vue.js と同じ要領で コンポーネントを設計して行きます。


## 参考サイト
- [Gridsome 公式サイト](https://gridsome.org/)
- [GridsomeでNetlify CMSを利用する \| ぺんすけブログ - ぺんすけブログ](https://pensuke.work/posts/gridsome-netlify-cms)
- [Gridsomeを利用して簡単なサイトを作成しよう](https://blog.nakamu.life/posts/gridsome-starter)
