# API Project: Timestamp Microservice for FCC

### User stories :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

#### Example usage:
* https://curse-arrow.hyperdev.space/api/timestamp/2015-12-15
* https://curse-arrow.hyperdev.space/api/timestamp/1450137600000

#### Example output:
* { "unix": 1450137600, "natural": "December 15, 2015" }

# Timestamp Microservice

## Technical Implementation

This service is built using Express.js and implements a timestamp conversion API with two main endpoints.

### Core Components

1. **Server Setup**
   - Uses Express.js framework
   - Enables CORS for cross-origin requests
   - Serves static files from the public directory
   - Listens on the port specified by environment variable or defaults to 3000

2. **API Endpoints**

   #### Root Endpoint (`/`)
   - Serves static HTML file from public directory as the landing page

   #### Timestamp Endpoint (`/api/:date?`)
   - Handles both parameterized and parameter-less requests
   - Parameter-less request returns current timestamp
   - Accepts either:
     - Unix timestamp (milliseconds)
     - Date string (valid date format)

### Date Processing Logic

1. **Parameter Handling**
   - If no date parameter: uses current date
   - If date parameter provided: validates and processes input

2. **Date Validation**
   - Checks if input is unix timestamp (numeric)
   - Attempts to parse date string if not numeric
   - Returns error for invalid dates

3. **Response Format**
   ```json
   {
     "unix": <timestamp in milliseconds>,
     "utc": <formatted UTC string>
   }
   ```

4. **Error Handling**
   - Returns `{ "error": "Invalid Date" }` for unparseable dates
   - Maintains consistent JSON response format

### Example Requests

1. Current time:
   ```
   GET /api/
   ```

2. Unix timestamp:
   ```
   GET /api/1451001600000
   ```

3. Date string:
   ```
   GET /api/2015-12-25
   ```

### Technical Dependencies
- Express.js for routing and server setup
- CORS middleware for cross-origin support
