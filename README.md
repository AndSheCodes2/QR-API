## Endpoints
### GET /api/filings
+ Available filters:
+ cik
+ symbol
```json
{
	"results_per_page": 25,
	"filings": [{
		"external_id": "0a4d0e12-5cfc-494c-ac46-cc28ba9c0dad",
		"cik": "0000004281",
		"type": "4",
		"symbol": "AA",
		"name": "ALCOA INC.",
		"period": "2016-07-01T00:00:00.000Z",
		"owner": {
			"name": "Reif Leo Rafael",
			"street_1": "390 PARK AVENUE",
			"street_2": "",
			"city": "10022",
			"state": "",
			"postal": null,
			"director": false
		}
  }]
}
```
### GET /api/filings/:id
```json
{
  "external_id":"0a4d0e12-5cfc-494c-ac46-cc28ba9c0dad",
  "cik":"0000004281",
  "type":"4",
  "symbol":"AA",
  "name":"ALCOA INC.",
  "period":"2016-07-01T00:00:00.000Z",
  "owner":{
    "name":"Reif Leo Rafael",
    "street_1":"390 PARK AVENUE",
    "street_2":"",
    "city":"10022",
    "state":"",
    "postal":null,
    "director":false
  },
  "trans":{
    "form_type":0,
    "code":"",
    "equity_swap":0,
    "shares":0,
    "price_per_share":0,
    "acquired_disposed_code":""
  },
  "notes":null
}
```

### GET /status
```
  curl http://localhost:3000/status
```
[Response]
```json
  {
    "status":"Ok"
  }
```


## EDGAR Processor

### Environment Variables
( Set in a profile or at runtime )

```
 export DATABASE_URL=postgres://readerwriter@localhost:5432/sec_filings?sslmode=disable // Database connection string [postgres]. (required)
 export FTP_PASS=sec.dev@example.com // Used as password for FTP (required)
 export FILE=/Users/sec.dev/sitemap.20160624.xml // For local testing only
```


## Local Testing w/FILE
```
  LOCAL=true FILE=/Users/sec.dev/sitemap.20160624.xml DATABASE_URL=... ./bin/edgar
```

## Runtime
```
  ./bin/edgar
```
