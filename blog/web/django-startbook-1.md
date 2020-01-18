---
title: Django 入門 環境構築編
tags:
  - python
  - Django
slugs: django-starter-1
description: この記事では、Django でアプリを公開するまでのチュートリアルについて書いて行きたいと思います。
thumbnail: /uploads/accord-2119_640-min.jpg
date: 2019-11-30T04:52:54.681Z
---
## Django とは
Django は、Python で構築することのできる Web フレームワークです。これまで、Instagram や DropBox などのアプリで使用された、世界で最も信頼されているWeb フレームワークのひとつです。人工知能のブームの中で注目を浴びたPython が話題になる中、ますますDjango の関心が高まっています。

## Django の長所、短所
Django を使うことに対しての利点については、次のようなものが挙げられます。

### 長所

- ### 拡張ライブラリ、テンプレートが充実  
Web　アプリ
- ### MVC の概念をもと、プログラミングのコードを保守しやすい
- ### d 
Django を構築するにあたり、

一方で、Django　の問題点には、次のようなものがあります。

### 短所
- ### Python で実行されるため、実行速度は遅い  
そもそもPython は、Java や Golang といった静的言語と比べ、演算に時間がかります。そのため、Django は、広告配信といった大量の情報を高速で処理を要求するような場合には向いていません。 
- ### 日本語の資料が少ない  
Django でアプリ開発するにあたって、本で調べたり、ネットの記事を調べると思います。しかし、ここ最近は増えてきているとはいえ、Rails などのライブラリと比べて、比較的資料は少ないです。

といったものです。

この講座で作成したサンプルコードは、次のGitHub のURL にて公開しています。


## 開発環境を構築する
始めるにあたって、環境を構築して行きたいと思います。今回は、Docker で開発環境を整えた場合とそうでない場合との２つを用意しました。

Docker の使い方についての詳しい説明は、次の記事を参考にしてください。

- ### Docker を使って構築する場合

環境を構築するにあたり、次の３つが必要になります。
- #### Dockerfile
- #### requirements.txt
- #### docker-compose.yml

まず、requirements.txt を次のように書いていきます

```txt
django
line-bot-sdk
```

続いて、Dockerfile を用意します。

- ### Dockerfile 
```Dockerfile

FROM python:3.8-alpine

COPY requirements.txt requirements.txt

RUN  apk add gcc mariadb-dev python3-dev build-base libffi-dev g++ libc-dev linux-headers &&\
pip install  -r requirements.txt
ENV isDevelop False
COPY ./api /api
WORKDIR /api

EXPOSE 8000

RUN django-app startproject django-app 
```

続いて, docker-compose.yml ファイルを用意します。
- ### docker-compose.yml

```yaml
version: "3"
services: 
  api: 
    restart: always
    build:  "."
    container_name: "django-api"
    volumes: 
      - ./api:/api
    ports: 
      - 8000:8000
    image: "okakyo/django-api"
    depends_on: 
      - "db"
    command: ["sh","-c","python manage.py runserver 0.0.0.0:8000"]
```
と書いた上で、

```bash
docker-compose build 
```
と実行すれば、開発環境が整います。

実行する際は、
```bash
docker-compose up 
```
として、アプリを起動してください。

- ### Docker を使わずに構築する場合

Docker を利用せずに, 自力で環境を構築するするには、まず Python が使用できる環境を用意します。
Mac や Linux の方であれば、 すでにPython を使用できる環境にあります。
Windows ユーザーであれば、Python の公式サイトから、Python が利用できる環境を用意しましょう。

Python がコマンドラインやターミナル上で使えるようにしたら、 コマンド上で、

```bash
$pip install django line-bot-sdk
```

として、Django ライブラリをインストールします。次の回で、 LINE Bot を構築しますので、
あらかじめこの段階で、インストールします。

続いて、作業ようディレクトリ、今回の場合は`/project` ディレクトリで作業する場合、

```bash
$cd project
$django startproject django-app
``` 
と実行します。すると、次のように django-app のディレクトリが完成します。


最後に、django-app ディレクトリへ移動して、requirements.txt を用意します

```bash
cd django-app
echo pip list freeze > requirements.txt
```

---
ここまでで、ディレクトリの配置状態は次のようになっています。


```bash
$tree 
.
├── Dockerfile // Docker で構築していなければ不要
├── db.sqlite3
├── __init__.py 
├── manage.py
└─── projects
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py

```
以上のように、Django が開発できるよう環境を整えました。

### 最後に
以上で、Django の開発環境が整いました。  
次回は、Django を使ってLINE のボットアプリを開発して行きたいと思います。

## 参考文献
[現場で使える Django の教科書《基礎編》&《実践編》現場で使える Django の教科書《基礎編》&《実践編》](https://booth.pm/ja/items/1059917https://booth.pm/ja/items/1059917)
[]()
