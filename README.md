## Endpoints
### GET /api/filings

```json
{
  "total_count": 0,
  "filings": [
    {
      "company_id": "xxx",
      "cik": "xxx",
      "accession_no": "xxxxxxxxx",
      "rec_date": "YYYY-MM-DD"
    }
  ]
}
```
### GET /api/filings/:id
```json
```
### POST /api/filings
```
  curl -H 'Content-type: application/json' \
    -X POST \
    -d '{ "company_id":"xxx", "cik":"xxx", "accession_no":"xxxxxxxxx", "rec_date":"YYYY-MM-DD" }'
    http://localhost:3000/api/filings
```
[Response]
```json
    {
      "company_id": "xxx",
      "cik": "xxx",
      "accession_no": "xxxxxxxxx",
      "rec_date": "YYYY-MM-DD"
    }
```

### GET /status
```
  curl http://localhost:3000/status
```
[Response]
```json
  {"status":"Ok"}
```
