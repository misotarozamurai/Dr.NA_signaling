# Dr.NA_signaling

webRTCシグナリングサーバー

## インストール

``` shell
$ npm init -y
$ npm i -D @babel/core @babel/cli @babel/preset-env
```

## babelrc

``` shell
$ vim .babelrc
```

``` json
{
  "presets": ["@babel/preset-env"]
}
```

`## package.json

``` json
{
    "scripts": {
        "build": "babel src -d lib"
    },
}
```

## 実行

### ビルド

``` shell
$ npm run build
```

### シグナリング起動

``` shell
$ npm run start
```

<p>&copy;2019 misotarozamurai Dr.NA</p>
