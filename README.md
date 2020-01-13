# GridSome Portfolio 

# 特徴
- Gridsome を利用して、ポートフォリオサイト, ブログサイトを構築しました。
- Markdown で書かれた記事を自動的にURL をホスティングするよう設定しました。
- このサイトを、Netlify CMS を利用して、ブログ記事の投稿、管理できるように設定しました。

## Library 

- Gridsome
- Vuetify 
- Pug

## ファイルの説明
- blog: ブログで投稿される記事の保存、管理するファイル
- static: ブログサイトで使われている画像を保存
- src: ブログを構成する要素を保存
    - template: typeName で定義した要素を記述する
    - layout: <Layout> を構成する要素が置かれている
    - components: Vue.js　のように、コンポーネント設計で定義した要素を記述 
    - pages: URL ごとに定義したVueを表示, 自動でURLが定義される
    - main.js: Vue.js を定義
    - admin: Netlify CMS が使得るようにするための設定

## Development 
- マークダウンを読み込めるようにするための設定

gridsome.config.js にて "plugins"　の設定を次のようにする。

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

また、template ディレクトリ内二、
- タグ機能の実装について 
先ほど作ったマークダウンの場所に次のコードを追加します。
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

## Deploy 

https://okakyo.myvnc.com/


## 今後の改善点：
- 各プログラミングごとに、なぜ自分自身がプログラミングレベルをそのように評価しているかについてをまとめて欲しかった
- Search bar を追加
- Google Form のURLをヘッダーに追加して、GASを応用したものを追加したい
- トップ欄に、ブログが公開できるようにしていく
~~- ブログの各カードに対してのアニメーションをホバーから別のアニメーションに変更~~
→　結局 Hover で維持 
~~- Footer　に記事が公開できるようにすることも必要~~
→　ここには広告などを追加
- 海外の人も確認できるようになっているから注意
~~- パンくずリストを追加すべき~~
→　実装完了
