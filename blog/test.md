---
title: Gridsome で ブログを制作した話
tags:
  - プログラミング
slugs: gridsome-blog
thumbnail: /uploads/coffee-2737047_640.jpg
date: 2019-11-26T20:15:41.251Z
---
こんにちは、おかきょーです。今回は、Gridsome を利用してポートフォリオ兼ブログとしての機能をもつサイトを作ってみました。このサイトについてのGitHub は次のページにありますので、気になった方はこちらのリポジトリをぜひフォークしてみて動かしてみてください。

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

## マークダウン
