## Tech Stack 
- MongoDB
- Express
- Node.js

## Installation

- Clone the repositry.
- use <code> npm init </code> to install required packages.
- use <code> nodemon app.js </code> to run the main js file.
- Have MongoDB Installed in your system and run local moongose server.
- Run the Api.

##  TestCases

- For post request /report sample request is:<br>
  <p>
    {<br>
        "reportDetails": <br>{
          "userID": "user-1",
          "marketID": "market-1",
          "marketName": "Vashi Navi Mumbai",
          "cmdtyID": "cmdty-1",
          "marketType": "Mandi",
          "cmdtyName": "Potato",
          "priceUnit": "Pack",
          "convFctr": 50,
          "price": 700
      }<br>
    }
  </p>

- For get report request: <br>
  { reportID: "949832f8-48c7-4cb2-8dcd-98f046a9a2e3"}

