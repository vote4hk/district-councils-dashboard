# 2019區議會選舉｜投票指南 ✋🏻🧡⚡

This is the repository for [vote4.hk](https://vote4.hk)

## About us

- g0vhk [https://g0vhk.io/](https://g0vhk.io/)

## Stack

Our frontend is using:

- frontend using react
- a server side rendering meta server using next.js

Our open source data is at [https://github.com/nandiheath/dc-data](dc-data)

Our backend is using:

- [hasura graphql server](https://hasura.io/)
- patroni - HA supported psql server (with postgix supported)

## Development

### React Frontend

```bash
cd web

cp .env-sample .env

# Modify the content of .env if you want to override the configuration

npm i

npm start
```

And navigate to `localhost:3000` for testing

### Meta Server

```bash
cd ssr

npm i

npm run dev
```

## Reference

[立場區議會選舉專頁 - 2015](https://dce2015.thestandnews.com)  
[Vote Taiwan 投票指南](https://councils.g0v.tw)  
[天下雜誌 - 全台村里選舉互動地圖](https://web.cw.com.tw/election2018)  
[initiummedia/hk_district_council_election](https://github.com/initiummedia/hk_district_council_election)  
[voteview.com](https://voteview.com/)  
[https://www.uswatch.tw/](https://www.uswatch.tw/)  
