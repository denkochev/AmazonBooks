# AmazonBooks
This application is part of the modular work within the Wildau-Kharkiv IT Bridge project and the National Aerospace University "Kharkiv Aviation Institute" (KhAI).

1. To launch client execute next commands:
```
cd client
npm i
npm start
```

2. Set your local connection URL in server/cd/connection.js and server/cd/showDatabases.js 
3. Dataset I've been using is: https://github.com/dudeonthehorse/datasets/blob/master/amazon.books.json

3. To launch server execute next commands:
```
cd server
npm i
npm run start
```


If you get any of possible errors from server side check whether you install all requirements in
app.js, db/connection.js and db/showDatabases.js