# district-councils-dashboard

## Preliminary Schema

`districts.json`
```
[
    "year": {
        "districts": {
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
            "constituent": [
                {
                    "cacode": (String) Constituent code,
                    "cname": (String) Chinese name of the constituent,
                    "ename": (String) English name of the constituent,
                    "expected_population": (Number) Projected Population as of Year,
                    "deviation_percentage",
                    "boundaries"
                    "main_areas"
                    "GeoJSON": (GeoJSON Object)
                }
            ]
        }
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