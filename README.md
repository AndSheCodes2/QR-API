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


## EDGAR Processor

### Environment Variables
( Set in a profile or at runtime )
* required export DATABASE_URL=postgres://readerwriter@localhost:5432/sec_filings?sslmode=disable // Database connection string.
* required export FTP_PASS=sec.dev@example.com // Used as password for FTP
export FILE=/Users/sec.dev/sitemap.20160624.xml // For local testing only


## Local Testing w/FILE
LOCAL=true FILE=/Users/sec.dev/sitemap.20160624.xml DATABASE_URL=... ./bin/edgar

## Runtime
./bin/edgar
