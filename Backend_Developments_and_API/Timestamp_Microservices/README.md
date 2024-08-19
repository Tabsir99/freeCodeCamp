# Timestamp_Microservice

## Project Overview

### Description
The Timestamp Microservice is an API built with Express.js that provides a simple interface for converting dates into Unix timestamps and UTC string formats. It handles various date formats, including Unix timestamps, ISO date strings, and more. If the provided date is invalid or missing, the API returns the current date and time.

### Features
- **Date Parsing**: Convert date strings and Unix timestamps to Unix time and UTC string.
- **Error Handling**: Responds with an error message for invalid date inputs.
- **Current Time**: Returns the current time if no date is provided.

### Endpoints
- **GET `/`**: Returns a simple JSON message confirming that the server is running.
  { "message": "yep its doing it" }

- **GET `/api/:date?`**: Returns the Unix timestamp and UTC string for the provided date.
  - **Parameters**:
    - `date` (optional): A valid date string or Unix timestamp.
  - **Responses**:
    - For a valid date or timestamp:
      { "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }
    - For an invalid date:
      { "error": "Invalid Date" }
    - For no date provided (current time):
      { "unix": 1630454400000, "utc": "Sun, 02 Aug 2024 00:00:00 GMT" }

- **All other routes**: Returns a 404 error for non-existent routes.
  { "status": "error", "message": "No such route handlers found" }

### Installation

1. **Clone the Repository**:
 ```bash
    git clone https://github.com/Tabsir99/freeCodeCamp.git

```
2. **Navigate to the Project Directory**:
 ```bash
    cd freeCodeCamp/Backend_Developments_and_API/Timestamp_Microservices
   ```
 3. **Install Dependencies**:
 ```bash
    npm install
   ```
 4. **Start the Server**:
 ```bash
    npm start
```
The server will be running on http://localhost:3001.

### Usage
- **Testing the API**:
  - Open your browser or an API client (like Postman).
  - Send a GET request to http://localhost:3000/api/:date? with different date formats to see the response.

- **Example Requests**:
  - GET /api/1451001600000
  - GET /api/2015-12-25
  - GET /api/

- **Handling Errors**:
  - An invalid date format will result in:
    { "error": "Invalid Date" }


## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Acknowledgments

- [freeCodeCamp](https://www.freecodecamp.org) for the relational database certification curriculum.
- [Express.js](https://expressjs.com) for providing a minimal and flexible Node.js web application framework.
