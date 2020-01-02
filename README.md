# Dr.NA_webSocket

name : Masakatsu Shibata

Dr.NA のフロントとセンサーとの双方向通信を行うためのサーバ

## ■ インストール

- 初期

  ``` shell
  $ npm init -y
  ```

- babel

  ``` shell
  $ npm i -D @babel/core @babel/cli @babel/preset-env
  ```

- ws

  ``` shell
  $ npm i -S ws
  ```

- ip

  ``` shell
  $ npm i -S ip
  ```

## ■ 設定

- babel

  - <a href=".babelrc">.babelrc</a> に記載

- ビルドコマンド<br>
`package.json` に記載

  ``` json
  {
    "scripts": {
      "build": "babel src -d lib"
    }
  }
  ```

## ■ 運用

- clone後の初期

  ``` shell
  $ npm i
  ```

- ビルド

  ``` shell
  $ npm run build
  ```

- サーバ起動

  ``` shell
  $ npm run start
  ```

<p>&copy;2020 Dr.NA_webSocket</p>
