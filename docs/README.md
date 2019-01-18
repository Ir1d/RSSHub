---
sidebar: auto
---

<p align="center">
    <img src="https://i.imgur.com/NZpRScX.png" alt="RSSHub" width="100">
</p>
<h1 align="center" class="logo">RSSHub</h1>

> 🍰 万物皆可 RSS

[![telegram](https://img.shields.io/badge/chat-telegram-brightgreen.svg?style=flat-square)](https://t.me/rsshub)
[![build status](https://img.shields.io/travis/DIYgod/RSSHub/master.svg?style=flat-square)](https://travis-ci.org/DIYgod/RSSHub)
[![Test coverage](https://img.shields.io/codecov/c/github/DIYgod/RSSHub.svg?style=flat-square)](https://codecov.io/github/DIYgod/RSSHub?branch=master)

RSSHub 是一个轻量、易于扩展的 RSS 生成器, 可以给任何奇奇怪怪的内容生成 RSS 订阅源

[Telegram 群](https://t.me/rsshub)

# 指南

## 通用参数

::: tip 提示

所有通用参数可以使用 `&` 连接组合使用, 效果叠加

:::

### 内容过滤

可以使用以下 URL query 过滤内容, 支持正则

filter 选出想要的内容

-   filter: 过滤标题和描述

-   filter_title: 过滤标题

-   filter_description: 过滤描述

-   filter_author: 过滤作者

举例: <https://rsshub.app/bilibili/user/coin/2267573?filter=微小微|赤九玖|暴走大事件>

filterout 去掉不要的内容

-   filterout: 过滤标题和描述

-   filterout_title: 过滤标题

-   filterout_description: 过滤描述

-   filterout_author: 过滤作者

举例: <https://rsshub.app/bilibili/user/coin/2267573?filterout=微小微|赤九玖|暴走大事件>

### 条数限制

可以使用 limit 参数限制最大条数, 主要用于排行榜类 RSS

举例: bilibili 排行榜前 10 <https://rsshub.app/bilibili/ranking/0/3?limit=10>

### 输出 Telegram 即时预览链接

可以输出 Telegram 可识别的即时预览链接, 主要用于文章类 RSS

Telegram 即时预览模式需要在官网制作页面处理模板，请前往[官网](https://instantview.telegram.org/)了解更多

-   tgiv: 模板 hash，可从模板制作页面分享出来的链接末尾获取（`&rhash=`后面跟着的字符串）

举例: <https://rsshub.app/novel/biquge/94_94525?tgiv=bd3c42818a7f7e>

### 输出格式

RSSHub 同时支持 RSS 2.0 和 Atom 输出格式, 在路由末尾添加 `.rss` 或 `.atom` 即可请求对应输出格式, 缺省为 RSS 2.0

举例:

-   缺省 RSS 2.0 - <https://rsshub.app/jianshu/home>
-   RSS 2.0 - <https://rsshub.app/jianshu/home.rss>
-   Atom - <https://rsshub.app/jianshu/home.atom>
-   和 filter 或其他 URL query 一起使用 <https://rsshub.app/bilibili/user/coin/2267573.atom?filter=微小微|赤九玖|暴走大事件>

## API 接口

::: warning 注意
API 仍处于开发状态中,  并可能会有改动. 欢迎提供建议！
:::

RSSHub 提供下列 API 接口:

### 可用公共路由列表

::: tip 提示
`protected_router.js`下的路由**不会被**包含在此 API 返回的结果当中.
:::

举例: <https://rsshub.app/api/routes/bilibili>

路由: `/api/routes/:name?`

参数:

-   name, 路由一级名称, 对应 [https://github.com/DIYgod/RSSHub/tree/master/routes](https://github.com/DIYgod/RSSHub/tree/master/routes) 中的文件夹名称. 可选, **缺省则返回所有可用路由**.

成功请求将会返回 HTTP 状态码 `200 OK` 与 JSON 结果, 格式如下:

```js
{
    "status": "success",
    "data": {
        "bilibili": {
            "routes": [
                "/bilibili/user/video/:uid",
                "/bilibili/user/article/:uid",
                "/bilibili/user/fav/:uid",
                "/bilibili/user/coin/:uid",
                "/bilibili/user/dynamic/:uid",
                "/bilibili/user/followers/:uid",
                "/bilibili/user/followings/:uid",
                "/bilibili/user/channel/:uid/:cid",
                "/bilibili/partion/:tid",
                "/bilibili/partion/ranking/:tid/:days?",
                "/bilibili/bangumi/:seasonid",
                "/bilibili/video/reply/:aid",
                "/bilibili/link/news/:product",
                "/bilibili/live/room/:roomID",
                "/bilibili/live/search/:key/:order",
                "/bilibili/live/area/:areaID/:order",
                "/bilibili/fav/:uid/:fid",
                "/bilibili/blackboard",
                "/bilibili/mall/new",
                "/bilibili/mall/ip/:id",
                "/bilibili/ranking/:rid?/:day?",
                "/bilibili/topic/:topic"
            ]
        }
    },
    "message": "request returned 22 routes"
}
```

若无符合请求路由, 请求将会返回 HTTP 状态码 `204 No Content`.

### 北京大学

<route name="信科公告通知" author="Ir1d" example="/pku/eecs/0" path="/universities/pku/eecs/:type" :paramsDesc="['分区 type, 可在网页 URL 中找到']">

| 全部 | 学院通知 | 人事通知 | 教务通知 | 学工通知 | 科研通知 | 财务通知 | 工会通知 | 院友通知 |
| ---- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 0    | 1        | 2        | 6        | 8        | 7        | 5        | 3        | 4        |
</route>

## LIST

返回一个用户通过的题目数

### POJ

<route name="POJ list" author="Ir1d" example="/list/poj/imcaffrey" path="/routes/linhua/poj/:user" :paramsDesc="['user 处为用户名']" />
