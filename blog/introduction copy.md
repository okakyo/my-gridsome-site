---
title: Pydantic2 入門
date: 2019-11-18 20:00:00 
slugs: helloWorld
---

こんにちは、おかきょーです。
今回は、pydantic について　記事を書いていきたいと思います。

## Pydantic とは

Pydantic は、Python の型アノテーションを利用して、実行時における型ヒントを提供したり、データのバリデーション時のエラー設定を簡単に提供してくれるためのライブラリです。

このライブラリは、SQLAlchemyでのデータベースモデルを定義する際に役立ちます。


## モデル

まず、定義するにあたって、次のように定義します。

``` python

from datetime import datetime
from typing import List
from pydantic import BaseModel

class Summer(BaseModel):
    id: int
    name: str   # (変数):(型)として、型を宣言する
    friends: List[int] = []  # "=" を利用してデフォルト値を定義することもできます
    created_at: datetime


external_data={
    'id': '1',
    'name' :'野獣先輩',
    'created_at': '2019-11-03 03:34',
    'friends': [114,'514']
}
summer = Summer(**external_data)

print(summer.id)

#> 1 # 入力された値が string 型でも、Int型に自動変換してくれます

print(repr(summer.created_at))

#> datetime.datetime(2019, 11, 3, 3, 34)

print(user.friends)

#> [114,514]

print(user.dict())

"""
{
   'id': 1,
   'name': '野獣先輩', 
   'created_at': datetime.datetime(2019, 11, 3, 3, 34),
   'friends': [114, 514]
}

"""
```

では、Validation Error が発生すると、次のようになります。

```python
try:
    User(created_at="黒塗り",friends=[1,'2','高級車'])

except ValidationError as e:
    print(e.json())

"""
[
  {
    "loc": [
      "id"
    ],
    "msg": "field required",
    "type": "value_error.missing"
  },
  {
    "loc": [
      "name"
    ],
    "msg": "field required",
    "type": "value_error.missing"
  },
  {
    "loc": [
      "created_at"
    ],
    "msg": "invalid datetime format",
    "type": "type_error.datetime"
  },
  {
    "loc": [
      "friends",
      2
    ],
    "msg": "value is not a valid integer",
    "type": "type_error.integer"
  }
]

"""
```

ここで、エラーが発生した際に返されるオブジェクトについては、次の通りです。
- loc
  - どこでエラーが発生しているかをリスト型で伝えてくれます。
  - 先頭の要素はエラー箇所を、その次の要素は、ネスト状になったエラー箇所の場所を示してくれます。
- type
  - エラーの種類を示します
- msg
  - エラー理由を説明してくれます。
- ctx: 
  - 自身で設定した任意のオブジェクトを返す
  - この機能を利用するために、エラ〜メッセージを返すように設定する


## SQLAlchemy と組み合わせてみる
では、これをPythonの ORM Wrapper であるSQLAlchemy を利用して、次のように
SQLモデルを設計することができます。

以下のコードは、[こちらより](https://pydantic-docs.helpmanual.io/usage/models/)を引用しています。

```python
from typing import List
from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel, constr

Base = declarative_base()

class CompanyOrm(Base):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True, nullable=False)
    public_key = Column(String(20), index=True, nullable=False, unique=True)
    name = Column(String(63), unique=True)
    domains = Column(ARRAY(String(255)))

class CompanyModel(BaseModel):
    id: int
    public_key: constr(max_length=20)
    name: constr(max_length=63)
    domains: List[constr(max_length=255)]

    class Config:
        orm_mode = True
        
co_orm = CompanyOrm(
    id=123,
    public_key='foobar',
    name='Testing',
    domains=['example.com', 'foobar.com']
)
print(co_orm)
#> <orm_mode.CompanyOrm object at 0x7f0de1bc1cd0>
co_model = CompanyModel.from_orm(co_orm)
print(co_model)
#> id=123 public_key='foobar' name='Testing' domains=['example.com',
#> 'foobar.com']

```

## Validators

**Validator デコレーター** を利用すれば、入力された値が適切かどうか、オブジェクト間の複雑な関連性を参照できるようにすることができます。

```python
from pydantic import BaseModel, ValidationError, validator

class UserModel(BaseModel):
    name: str
    username: str
    password1: str
    password2: str

    @validator('name')
    def name_must_contain_space(cls, v):
        if ' ' not in v:
            raise ValueError('must contain a space')
        return v.title()

    @validator('password2')
    def passwords_match(cls, v, values, **kwargs):
        if 'password1' in values and v != values['password1']:
            raise ValueError('passwords do not match')
        return v

    @validator('username')
    def username_alphanumeric(cls, v):
        assert v.isalpha(), 'must be alphanumeric'
        return v

print(UserModel(name='samuel colvin', username='scolvin', password1='zxcvbn',
                password2='zxcvbn'))
#> name='Samuel Colvin' username='scolvin' password1='zxcvbn' password2='zxcvbn'

try:
    UserModel(name='samuel', username='scolvin', password1='zxcvbn',
              password2='zxcvbn2')
except ValidationError as e:
    print(e)
"""
2 validation errors for UserModel
name
  must contain a space (type=value_error)
password2
  passwords do not match (type=value_error)
"""
```

### Pre and per-item validators
Validator を起動させる際の優先順を設定するには、次の引数`pre`,`pre_item`を利用します。
`pre`は、設定したほかのValidator よりも先にValidatorを起動します。
`each_item=True`とすると、リストや辞書、といった各要素ごとにValidation を実行してくれます。

``` python
from typing import List
from pydantic import BaseModel, ValidationError, validator

class DemoModel(BaseModel):
    square_numbers: List[int] = []
    cube_numbers: List[int] = []

    # '*' is the same as 'cube_numbers', 'square_numbers' here:
    @validator('*', pre=True)
    def split_str(cls, v):
        if isinstance(v, str):
            return v.split('|')
        return v

    @validator('cube_numbers', 'square_numbers')
    def check_sum(cls, v):
        if sum(v) > 42:
            raise ValueError(f'sum of numbers greater than 42')
        return v

    @validator('square_numbers', each_item=True)
    def check_squares(cls, v):
        assert v ** 0.5 % 1 == 0, f'{v} is not a square number'
        return v

    @validator('cube_numbers', each_item=True)
    def check_cubes(cls, v):
        # 64 ** (1 / 3) == 3.9999999999999996 (!)
        # this is not a good way of checking cubes
        assert v ** (1 / 3) % 1 == 0, f'{v} is not a cubed number'
        return v

print(DemoModel(square_numbers=[1, 4, 9]))
#> square_numbers=[1, 4, 9] cube_numbers=[]
print(DemoModel(square_numbers='1|4|16'))
#> square_numbers=[1, 4, 16] cube_numbers=[]
print(DemoModel(square_numbers=[16], cube_numbers=[8, 27]))
#> square_numbers=[16] cube_numbers=[8, 27]
try:
    DemoModel(square_numbers=[1, 4, 2])
except ValidationError as e:
    print(e)
"""
1 validation error for DemoModel
square_numbers -> 2
  2 is not a square number (type=assertion_error)
"""

try:
    DemoModel(cube_numbers=[27, 27])
except ValidationError as e:
    print(e)
"""
1 validation error for DemoModel
cube_numbers
  sum of numbers greater than 42 (type=value_error)
"""
```

### Validate Always
パフォーマンスの理由から、デフォルトで、値が与えられていない場合ではこのValidatorは起動しません。しかし、値が与えられていない場合でも実行させるためには、引数を`always= True` と設定する必要があります。 

```python

from datetime import datetime

from pydantic import BaseModel, validator

class DemoModel(BaseModel):
    ts: datetime = None

    @validator('ts', pre=True, always=True)
    def set_ts_now(cls, v):
        return v or datetime.now()

print(DemoModel())
#> ts=datetime.datetime(2019, 10, 24, 15, 7, 51, 449261)
print(DemoModel(ts='2017-11-08T14:00'))
#> ts=datetime.datetime(2017, 11, 8, 14, 0)

```

## 最後に
以上が、基本的なPydantic の使い方です。これを利用して、 SQLのスチーマにバリデーションや型をPythonで設定できます。
詳細な設定については、以下の公式ドキュメントを参照ください。


## 参考文献
Pydanit 公式ドキュメント(https://pydantic-docs.helpmanual.io/)


