# District Councils Dashboard

> More transparency

District Councils Dashboard:
https://cswbrian.github.io/district-councils-dashboard

### Set-up

```bash
cd web

npm i

npm start
```

### Reference

[立場區議會選舉專頁 - 2015](https://dce2015.thestandnews.com)  
[Vote Taiwan 投票指南](https://councils.g0v.tw)  
[天下雜誌 - 全台村里選舉互動地圖](https://web.cw.com.tw/election2018)  
[initiummedia/hk_district_council_election](https://github.com/initiummedia/hk_district_council_election)  
[voteview.com](https://voteview.com/)  

### Preliminary Schema

`district.json`
```
[
    <year_2003>: {
        <district_code_A>: {
            "cname": (String) Chinese name of the district, 
            "ename": (String) English name of the district, 
            "expected_population": (Number) Projected Population as of Year,
            "GeoJSON": (GeoJSON Object),
            "electors": (Number) Number of Electors in the Final Register,
            "seats: {
                "elected"
                "appointed"
                "ex-officio"
            },
            <constituent_code_01>: {   // A01
                "cacode": (String) Constituent code,
                "cname": (String) Chinese name of the constituent,
                "ename": (String) English name of the constituent,
                "expected_population": (Number) Projected Population as of Year,
                "deviation_percentage",
                "boundaries"
                "main_areas"
                "GeoJSON": (GeoJSON Object),
                ....
            },
            <constituent_code_02>: {   // A02
                "cacode": (String) Constituent code,
                "cname": (String) Chinese name of the constituent,
                "ename": (String) English name of the constituent,
                "expected_population": (Number) Projected Population as of Year,
                "deviation_percentage",
                "boundaries"
                "main_areas"
                "GeoJSON": (GeoJSON Object),
                ....
            }
        },
         <district_code_B>: {
             ...
         } 
    },
    <year_2007>: {

    }
]

```

`people.json`
```
[
    {
        "cname": (String) Chinese name of the candidate,
        "ename": (String) English name of the candidate,
        "gender": (String) Gender of the candidate,
        "birth": 
        "current_in_office": (Boolean),
        "terms": [{
            "start_date",
            "end_date",
            "end_reason
        }],
        "party": [{
            "year": (String) Year,
            "party": (String) Party
        }]
        "elections": [
            {
                "election_id",
                "year",
                "cacode",
                "Platform"
                "number": (Number) Candidate number,
                "cAlias": (String) Chinese alias of the candidate,
                "eAlias": (String) English alias of the candidate,
                "cOccupation": [(String) Declared occupation in Chinese],
                "eOccupation": [(String) Declared occupation in English],
                "cAffiliation": [(String) Delcared political affliation in Chinese],
                "eAffiliation": [(String) Delcared political affliation in English],
                "vote": (Integer) Vote received,
                "win": (Boolean) whether win or not
            }
        ]
    }
]
```