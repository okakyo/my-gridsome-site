---
title: Dockerfile にBcrypt を 導入する方法
tags:
  - docker
  - node.js
slugs: nodejs-bcrypt
description: >-
  この記事では、Dockerfile にBcrypt を導入する方法について書いて行きたいと考えています。Docker 環境下でBcrypt を使用した時、エラーが発生してしまい、開発が進まなかったことがありました。今回は、その解決法について書いて行きたいと考えて、この記事を書きました。

thumbnail: /uploads/security-265130_640-min.jpg
date: 2020-01-20T04:52:54.681Z
---

## 事前準備
今回のアプリ開発におけるファイルのディレクトリ構造は、次のようになっています。

```bash
.
├-- api
|   ├── Dockerfile
|   ├-- node_modules
|   ├-- src
|   |    └-- main.js 
|   ├-- .dockerignore
|   ├── package-lock.json
|   └── package.json
|
└─--docker-compose.yaml
```

まず、`.dockerignore`ファイルを次のように設定しました。

- .dockerignore
```
node_modules
Dockerfile
```

これは、Docker コンテナを立てる際、ライブラリにコピーする必要のないものを設定することでコンテナのビルド時間を減らすことができます。

- Dockerfile
```Dockerfile
FROM node:13.0.1-alpine 

RUN apk add --no-cache python make g++ gcc 

COPY package-lock.json /api/package-lock.json

COPY package.json /api/package.json

WORKDIR /api

RUN npm ci
```

最後に、`docker-compose.yaml` を次のように書いて行きます。

- docker-compose.yaml
```yaml
version: "3.0"
services:
  api:
    image: "<dockerhub-account>/express-api"
    restart: always
    build: ./api
    container_name: "api_of_startweb"
    ports:
      - 3000:3000
    volumes: 
      - ./api:/api
```
**"dockerhub-account"** には、 DockerHub のアカウント名を入力してください。 
以上のように設定したのち, 親ディレクトリにて、

```
docker-compose build
docker-compose up
```

として実行します。


しかし、この状態では、次のようなエラーが発生してしまい、アプリが起動しませんでした。


```
Error: Error loading shared library /api/node_modules/bcrypt/lib/binding/bcrypt_lib.node: Exec format error
    at Object.Module._extensions..node (internal/modules/cjs/loader.js:1041:18)
    at Module.load (internal/modules/cjs/loader.js:822:32)
    at Function.Module._load (internal/modules/cjs/loader.js:730:14)
    at Module.require (internal/modules/cjs/loader.js:864:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/api/node_modules/bcrypt/bcrypt.js:6:16)
    at Module._compile (internal/modules/cjs/loader.js:971:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1011:10)
    at Module.load (internal/modules/cjs/loader.js:822:32)
    at Function.Module._load (internal/modules/cjs/loader.js:730:14)
```

## 解決方法

このようなエラー要因は、コンテナ内ののBcrypt ライブラリと ローカル環境内のBcrypt ライブラリと同期した際に発生することがわかりました。この解決方法が、**これらを同期させない** ことでした。

node_modules に新たにライブラリを追加するたびにコンテナを再ビルドする必要がありますが、コードが修正されるたびにコンテナのコードも修正されるので、開発時に大きく役立てられます。

解決方法として、`docker-compose.yaml` を次のように修正しました。

- docker-compose.yaml
```yaml
version: "3.0"
services:
  api:
    image: "<dockerhub-account>/express-api"
    restart: always
    build: ./api
    container_name: "api_of_startweb"
    ports:
      - 3000:3000
    # プログラミングコードしか同期させないように設定を変更した
    volumes:
      - ./api/src:/api/src 
```

このようにすれば、Docker 上で、Node.jsライブラリが構築され, Bcrypt 使用時にエラーを出すことなく開発することができます。
