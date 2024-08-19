# Header_Parser_Microservice

## Project Overview

### Description

The Header Parser Microservice is an API built with Express.js that extracts and returns important information from the headers of incoming HTTP requests. This includes the client's IP address, preferred language, and operating system details.

### Features

- **IP Address Extraction**: Retrieves the client's IP address from the request headers.
- **Language Detection**: Identifies the client's preferred language from the `Accept-Language` header.
- **Software Information**: Extracts the client's operating system and browser details from the `User-Agent` header.

### Endpoints

- **GET `/api/whoami`**: Returns a JSON object containing the client's IP address, language, and software details.

  - **Response Structure**:
    ```json
    {
      "ipaddress": "192.168.1.1",
      "language": "en-US,en;q=0.9",
      "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }
    ```

### Installation

1. **Clone the Repository**:

   ```bash
   git clone clone https://github.com/Tabsir99/freeCodeCamp.git

   ```

2. **Navigate to the Project Directory**:

    ```bash
    cd freeCodeCamp/Backend_Developments_and_API/Header_Parser_Microservice

    ```

3. **Install Dependencies**:

    ```bash
    npm install

    ```

4. **Start the Server**:

    ```bash
    npm start

    ```

The server will be running on http://localhost:3000.

### Usage

Testing the API:
Open your browser or an API client (like Postman).
Send a GET request to http://localhost:3000/api/whoami to receive the IP address, language, and software details.

Example Response:

```json
{
"ipaddress": "192.168.1.1",
"language": "en-US",
"software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}

```

### License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

### Acknowledgments

- [freeCodeCamp](https://www.freecodecamp.org) for the relational database certification curriculum.
- [Express.js](https://expressjs.com) for providing a minimal and flexible Node.js web application framework.
