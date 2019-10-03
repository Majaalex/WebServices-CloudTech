# React frontend

A frontend to make use of the node and aspnet backends.

## Install

Clone the directory and install the dependencies

``` bash
npm install
```

## Run

The application will run on port 3000 by default

``` bash
npm start
```

### Pages

The site will have 3 pages and use a react router to swap between the pages

* A page to list all events and persons
  * Events will be listed by name and type
  * Persons will be listed alongside their total cost
* A page where you can create a new registration
  * A dropdown list to select a person and event
* A page to modify persons and events
  * Input fields that are automatically filled the person or events information

#### List

[http://localhost:3000/lists](http://localhost:3000/lists)

#### New registration

[http://localhost:3000/new](http://localhost:3000/new)

#### Modify

[http://localhost:3000/modify](http://localhost:3000/modify)

[http://localhost:3000/modify/persons/id](http://localhost:3000/persons/id)

[http://localhost:3000/modify/events/id](http://localhost:3000/events/id)
