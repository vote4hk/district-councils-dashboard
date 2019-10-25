# 2019區議會選舉｜投票指南 ✋🏻🧡⚡

[vote4.hk](https://vote4.hk)

## Stack

- langauage: javascript
- framework: react
- chart: d3/zingchart
- graphql: apollo
- ssr: next.js

## Source data
https://github.com/nandiheath/dc-data  

And the web app requires a graphql backend to serve the data
Now it is hosted at [https://gql.opencultures.life/graphql](https://gql.opencultures.life/graphql)

## Development
### Website
```bash
cd web

cp .env-sample .env

# Modify the content of .env if you want to override the configuration

npm i

npm start
```

### SSR
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
