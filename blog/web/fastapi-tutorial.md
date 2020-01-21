---
title: FastAPI 入門
tags:
  - python
  - Fastapi
slugs: fastapi-starter-1
description: この記事では、FastAPI を実装した話について書いています。この記事では、FastAPI をDocker を利用した環境構築から、アプリを構築する方法を書いています。
thumbnail: /uploads/accord-2119_640-min.jpg
date: 2020-1-18T04:52:54.681Z
---

## FastAPI とは
FastAPI は、Django やFlask といったPython のWebフレームワークの一つです。

このフレームワークには、次のような特徴があります。
- OpenAPI に基づいて、自動的にJSON Schema モデルを生成してくれます

- Python のASGI フレームワークである[Uvicorn](https://www.uvicorn.org/)により、
  Node.jsやGo言語並のパフォーマンスが利用できます

- [Pydantic](https://pydantic-docs.helpmanual.io/) を利用して、モデルの型やバリデーションを定義することができます
 - API を定義すると、Swagger UI,Redoc によるドキュメントが自動生成されます
  
- GraphQLやWebSocketも対応しています

## 環境構築

このFastAPI は、**Python のバージョンが3.6 以上**であるという条件があります。
今回、Docker を利用しての環境構築を行っていきたいと思います。

まず、`requirement.txt` を書いていきます。

- requirement.txt
```
fastapi
sqlalchemy 
uvicorn 
email-validator
graphene 
jinja2
aiofiles
PyMySQL
```

続いて、`Dockerfile` を次のように書いていきます。

```Dockerfile
FROM python:3.8.0-alpine
WORKDIR /api
# gcc ,openssl をインストールしなければ、python のセットアップ時にエラーを起こしてしまう。
RUN apk add build-base libffi-dev
COPY ./requirement.txt .
RUN pip install --upgrade setuptools && pip install -r requirement.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

```

この時、`--host 0:0:0:0` を設定しなければ、コンテナが起動できても、ローカルホストへアクセスできません。
Flask や Rails などのフレームワークでDocker で起動したにもかかわらずlocalhost へアクセスできない場合は、
**起動ホストを'0.0.0.0'** と設定して起動してみてください。

次に、docker-compose.yml を利用して構築していきます。

- docker-compose.yaml
```yaml
version: '3.0'
services:
  api:
    restart: always
    build: ./api
    container_name: 'api'
    ports:
      - 8000:8000
    volumes: 
      - ./api:/api
    depends_on:
      - db
  db:
    restart: always
    image: mariadb:latest
    ports: 
      - 3306:3306
    container_name: 'api_db'
    environment: 
      MYSQL_DATABASE: example
      MYSQL_ROOT_PASSWORD: example
      TZ: 'Asia/Tokyo'
    volumes: 
      - ./docker/db/data:/var/lib/mysql
      - ./docker/db/my.cnf:/etc/mysql/conf.d/my.cnf
      - ./docker/db/sql:/docker-entrypoint-initdb.d
        
```

## Hello World 

まず、このフレームワークを実装して **"Hello World"** と返すよう実装します。

```python 

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
```

この時、`async def (関数)`として、非同期関数で実装するほうががいいとされます。
このことについては、公式ドキュメントを参照してください。

実行するには、次のようにします。

```bash
$ docker-compose build
$ docker-compose up 
```

起動したら、cURL を利用してhttp://localhost:8000 へアクセスすると,

```bash 
$curl localhost:8000
{"message":"Hello World"}
```

とJSON 形式のデータが返ってきます.

このとき、生成されたドキュメントを確認するにはこちらです。[https://localhost:8000/docs](https://localhost:8000/docs)

##  パス、クエリのパラメーターの取得
次に, Path のパラメーターやクエリの値を取得するには、次のように取得します.

```python

from fastapi import FastAPI,Query


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/{id}")
async def getId(id: int):
    return {'id':id}

@app.get("/items/")
async def read_items(q: List[str] = Query(None)):
    query_items = {"q": q}
    return query_items
    
```
curl を利用して、返ってくるJSON データを確認すると、次の通りになります。

```bash
$curl localhost:8000/2
{"id":2}

$curl localhost:8000/items/?q=20
{"q":20}

# Validation Error　は次のように返します
$curl localhost:8000/hello
{
  "detail":
   [
    {
      "loc":
      [
        "path",
        "id"
      ],
      "msg":"value is not a valid integer",
      "type":"type_error.integer"
    }
  ]
}

"""
- loc
  どこでエラーが発生しているかをリスト型で伝えてくれます。
  先頭の要素はエラー箇所を、その次の要素は、ネスト状になったエラー箇所の場所を示してくれます。
- type
  エラーの種類を示します
- msg
  エラー理由を説明してくれます。

"""
```

## Request, Response の取得

Request のBody について、**pydantic** を利用して、型安全に取り出すことができます。

```python
from fastapi import FastAPI
from pydantic import BaseModel
from pydantic.types import EmailStr

app = FastAPI()


class UserIn(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: str = None


class UserOut(BaseModel):
    username: str
    email: EmailStr
    full_name: str = None


@app.post("/user/", response_model=UserOut) # Response の型を定義
async def create_user(*, user: UserIn):     # Request の型を定義
    return user
```

この時、Resonseの型を定義する際は、`@app.post('/',resonse_model=(モデルの型))` というように
デコレーターの引数である**response_model**に型を定義します。


## HTML テンプレート (Jinja2) を利用する

Flask で標準で用いられていたJinja　を利用して、HTML ファイルを返すこともできます。
しかし、それらを利用するためには、`jinja2`を事前にインストールする必要があります。

また、CSS やJS といった静的ファイルを利用する際には、`aiofiles` をインストールします。

```python
from fastapi import FastAPI
from starlette.requests import Request
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")


@app.get("/items/{id}")
async def read_item(request: Request, id: str):
    return templates.TemplateResponse("item.html", {"request": request, "id": id})

```

- item.html
```html
<html>
<head>
    <title>Item Details</title>
    <link href="{{ url_for('static', path='/styles.css') }}" rel="stylesheet">
</head>
<body>
    <h1>Item ID: {{ id }}</h1>
</body>
</html>
```
- styles.css
```css
h1 {
    color: green;
}
```

## SQL を扱う

Web アプリ制作でSQLを扱う際、データベースに直接コマンドを書いて実行するといったことは非常に大変です。
そのため、ORM Wrapper を通してDB の設計を行います。Python では、**SQLALchemy** を通して設計します。
今回は、SQLAlchemy とpydantic を使い、型安全なデータベースを作っていきます。

詳しい使い方については、SQLAlchemy の公式ドキュメントを参照してください。

``` python 

from fastapi imoprt FastAPI
from pydantic import BaseModel

# DB へのURL 
SQLALCHEMY_DATABASE_URL = "mariadb://db:3306/example

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Account(BaseModel):
    id: Int
    name: str
    password: str
    email: str 

app=FastAPI()

@app.get('/')
async def findAllAccount():
  return 
   
@app.post('/')
async def saveAccount():
    pass
```

## GraphQL、WebSocket の実装

GraphQL, Websocket を利用する際には、次のようにします。
- ### GraphQL

```python
import graphene
from fastapi import FastAPI
from starlette.graphql import GraphQLApp


class Query(graphene.ObjectType):
    hello = graphene.String(name=graphene.String(default_value="stranger"))

    def resolve_hello(self, info, name):
        return "Hello " + name


app = FastAPI()
app.add_route("/", GraphQLApp(schema=graphene.Schema(query=Query)))

```

- ### WebSocket(Jinja2 を組み合わせて構築してみる)


 ```python
 from fastapi import Cookie, Depends, FastAPI, Header
from starlette.responses import HTMLResponse
from starlette.status import WS_1008_POLICY_VIOLATION
from starlette.websockets import WebSocket

app = FastAPI()

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <label>Item ID: <input type="text" id="itemId" autocomplete="off" value="foo"/></label>
            <button onclick="connect(event)">Connect</button>
            <br>
            <label>Message: <input type="text" id="messageText" autocomplete="off"/></label>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
        var ws = null;
            function connect(event) {
                var input = document.getElementById("itemId")
                ws = new WebSocket("ws://localhost:8000/items/" + input.value + "/ws");
                ws.onmessage = function(event) {
                    var messages = document.getElementById('messages')
                    var message = document.createElement('li')
                    var content = document.createTextNode(event.data)
                    message.appendChild(content)
                    messages.appendChild(message)
                };
            }
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

@app.get("/")
async def get():
    return HTMLResponse(html)


async def get_cookie_or_client(
    websocket: WebSocket, session: str = Cookie(None), x_client: str = Header(None)
):
    if session is None and x_client is None:
        await websocket.close(code=WS_1008_POLICY_VIOLATION)
    return session or x_client


@app.websocket("/items/{item_id}/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    item_id: int,
    q: str = None,
    cookie_or_client: str = Depends(get_cookie_or_client),
):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(
            f"Session Cookie or X-Client Header value is: {cookie_or_client}"
        )
        if q is not None:
            await websocket.send_text(f"Query parameter q is: {q}")
        await websocket.send_text(f"Message text was: {data}, for item ID: {item_id}")
```

## 最後に
これまで、PythonでWebアプリを作成するはあまり好まれるものではありませんでした。
これまでのFlaskやDjango といったものは、Node.js やGo 言語に比べ、速度が遅いという問題がありした。
マイクロサービスアーキテクチャが普及していく中で、速度かつ軽量なフレームワークが好まれるために、
処理速度の遅さは致命的な問題でした。

しかしながら、これらの条件を満たしたこのFastAPIを利用すれば、
より高速なレスポンスによるパフォーマンスの向上が期待できます。

さらに、Pydantic による型安全が行えるため、開発する際の手助けにもなるので、
今後Flaskの代替フレームワークとして、ますます普及が進むと思われます。



## 参考文献
- [Fast API  公式ドキュメント](https://fastapi.tiangolo.com/)
- [Pydantic 入門](https://qiita.com/0622okakyo/items/d1dcb896621907f9002b)


