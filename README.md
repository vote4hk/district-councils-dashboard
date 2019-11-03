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

### i18n
We are using react-i18next to assert that needed translations get loaded or that your content gets rendered when the language changes. The full documentation is [here](https://react.i18next.com/). 

The translation json files for ``en`` and ``zh`` are located at ``web/src/locales/en/translation.json`` and ``web/src/locales/zh/translation.json`` respectively. By default, ``zh`` is used. If you have changes to the wording, please make sure they are added or updated in both json files. 

Example: 
````json
{
    "candidate.nominateStatus.disqualified": "Disqualified"
}
````

````json
{
    "candidate.nominateStatus.disqualified": "取消資格"
}
````

Use ``useTranslation()`` for functional components:
````javascript
// Example: CandidatesContainer.js
// ---------------------------------------------
// 1. import useTranslation from react-i18next
import { useTranslation } from 'react-i18next'
// 2. define t from useTranslation()
const { t } = useTranslation()
// 3. use the t function with the key as the parameter 
const  status = t('candidate.nominateStatus.disqualified')
````

Use ``withTranslation()`` for class components:
````javascript
// Example: MainAreas.js
// ---------------------------------------------
// 1. import withTranslation from react-i18next
import { withTranslation } from 'react-i18next'
// 2. define t from the props
const { t } = this.props
// 3. use the t function with the key as the parameter 
const text = t('mainAreas.text1')
// 4. wrap the class component with withTranslation HOC
export default withTranslation()(MainAreas)
````

Use ``withLanguage()`` to show values for the selected language. 
````javascript
// Example: Summary.js
// ---------------------------------------------
// 1. import withLanguage from utils/helper
import { withLanguage } from 'utils/helper'
// 2. withLanguage() takes 2 parameters - value in en and value in zh respectively
// In this example, district.name_en will be used if the lang is en
// if the lang is zh, district.name_zh will be used
// if district.name_en is null, it will fall back to zh 
withLanguage(district.name_en, district.name_zh)
// if you are not sure what the field names for both language are, check the query 
// which can be found either in the same file or in web/src/queries/gql.js
````

## Reference

[立場區議會選舉專頁 - 2015](https://dce2015.thestandnews.com)  
[Vote Taiwan 投票指南](https://councils.g0v.tw)  
[天下雜誌 - 全台村里選舉互動地圖](https://web.cw.com.tw/election2018)  
[initiummedia/hk_district_council_election](https://github.com/initiummedia/hk_district_council_election)  
[voteview.com](https://voteview.com/)  
[https://www.uswatch.tw/](https://www.uswatch.tw/)  
