# App Backend

This project serves as a very slim backend designed to work with ExpressJs and SQL like BD. In this project is possible create an user, login, create transactions of payments and list all transactions.

## Init Project
To install all dependences
```
npm install
```
## Running the server
To run server, execute this code
```
npm run dev
```

## Create DB
To conect whit DB is necessary create two columns - 

login
```
id varchar(36) PK 
name varchar(45) 
email varchar(45) 
password varchar(45)
```
transactions
```
id varchar(255) PK 
value varchar(45) 
createdAt varchar(255) 
createdBy varchar(255) 
dueDate varchar(45) 
validateCode varchar(45) 
numberCard varchar(45) 
name varchar(45)
```

## Swagger Docs
After up the server, to see the docs, go to /api-docs
