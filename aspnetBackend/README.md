# ASP.NET REST API

This application is written in c#, asp.net and makes use of an Azure SQL database to store the registrations. It runs locally.

## Install

Clone the directory and build the project in Visual Studio or something else

## Run

Visual Studio default is Ctrl + F5

## REST API

The api was tested via Postman

* **URL**

localhost:5000/api/registration

localhost:5000/api/person

* **Methods**

  GET | POST | PUT | DELETE

### Request params

#### GET

localhost:5000/api/person

localhost:5000/api/registration

optional id=[int] for registrations

localhost:5000/api/registration/id

#### POST

localhost:5000/api/registration

``` c#
Person: [String]
Event: [String]
```

#### PUT

localhost:5000/api/registration/id

id = [int], required

``` c#
Person: [String]
Event: [String]
```

#### DELETE

localhost:5000/api/registration/id

id = [int], required

**A DELETE request to the following api will delete ALL registrations for that specific person** and takes in the longer string id from the node backend.

localhost:5000/api/person/id

id = [String], required
