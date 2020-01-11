---
title: Dockerfile にBcrypt を 導入する方法
tags: 
  - docker
  - node.js 
slugs: nodejs-bcrypt
thumbnail: /uploads/interview-1018333_640.png
date: 2020-1-10T04:52:54.681Z
---

この記事では、Dockerfile にBcrypt を導入する方法について書いて行きたいと考えています。
このとき、 ファイルのディレクトリ構造としては次のようになっています。
```bash
.
.
├── api
|   ├── Dockerfile
|   ├──  node_modules
|   ├──  src
|   |    └── main.js 
|   ├──  .dockerignore
|   ├── package-lock.json
|   └── package.json
|
└──docker-compose.yaml

```

## 直面した課題
Node.js をDocker 上で構築しようとした際、次のようなエラーが出てしまい環境構築することができないという課題がありました。






## エラー要因
Docker コンテナとローカルとで、node_modules を同期したときに発生しているようです。
解決するには、コンテナとローカルとのnode_modules を分離して開発することです。
## 解決方法
node_modules を同期させないようにするには、まず.dockerignore を設定します。
- .dockerignore

```
node_modules
```
- Dockerfile
```Dockerfile

FROM node:13.0.1-alpine 

RUN apk add --no-cache python make g++ gcc 

COPY package-lock.json /api/package-lock.json

COPY package.json /api/package.json

WORKDIR /api

RUN npm ci

```
最後に、docker-compose.yaml を次のように書いて行きます。

- docker-compose.yaml
```yaml
version: "3.0"
services:
  api:
    image: "<dockerhub-account>/express-base"
    restart: always
    build: ./api
    container_name: "api_of_startweb"
    ports:
      - 3000:3000
    volumes: 
      - ./api:/api
```

以上のように設定したのち, 親ディレクトリにて、
```
docker-compose build
docker-compose up
```
として実行します。

このようにすれば、Docker 上で、Bcrypt をインストールすることができます。

