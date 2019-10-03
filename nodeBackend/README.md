# Node REST API

This application is written in node and makes use of mongoDB to act as a REST API to track persons and events

## Install

Clone the directory and install the dependencies

``` node
npm install
```

You will also need to add a .env file with a PORT and a mongoDB connection string

``` env
MONGODB_URI=YourConnectionString
PORT=YourPort
```

## Run

``` node
npm run watch
```

## REST API

I made use of the VSC Rest Client extension to test my API, the are found in the /request directory
The port numbers are an example and will be based on what you have in the .env file

* **URL**

localhost:3003/api/persons

* **Methods**

  GET | POST | PUT | DELETE

### Request params

#### GET

localhost:3003/api/persons

localhost:3003/api/events

optional id=[string]

localhost:3003/api/persons/id

localhost:3003/api/events/id

#### POST

localhost:3003/api/persons

``` node
firstName: [String]
surName: [String]
email: [String]
phone: [String]
```
  
localhost:3003/api/events

``` node
name: [String]
type: [String]
date: [String]
totalCost: [Int]
address: [String]
detail: [String]
```

#### PUT

localhost:3003/api/persons/id

id = [String], required

``` node
firstName: [String]
surName: [String]
email: [String]
phone: [String]
```
  
localhost:3003/api/events/id

id = [String], required

``` node
name: [String]
type: [String]
date: [String]
totalCost: [Int]
address: [String]
detail: [String]
```

#### DELETE

localhost:3003/api/persons/id

id = [String], required
