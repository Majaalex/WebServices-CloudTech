# Web Services and Cloud Technology

A web service and cloud technology school course

## About

The course consisted of:

* Make a REST API making use of node and mongoDB
* Make a REST API with the use of ASP.NET
* Make a frontend that uses both API's

## Key Learnings

* Development of REST API
  * ASP.NET as well as NODE API
* Learning how to work with HTTP Protocols
  * CORS
* Making use of cloud services such as Azure and MongoDB

## Projects

### A Node backend using MongoDB to store information

The application is used to track persons and events with information such as names, dates, numbers etc.
Persons and events are not connected and both have a separate API

**You can request:**

* GET all persons or events
* GET a specific person or event
* POST a new person or event
* PUT new values for a person or event
* DELETE a person or event

### An ASP.NET backend using an Azure SQL database

This application makes use of the node backend to create registrations which connect people with events.
These registrations can then be accessed through a REST API

**You can request:**

* GET all registrations
* GET a specific registration
* POST a new registration
* PUT new values for a registration
* DELETE a registration

### The Frontend, a simple React webpage

The frontend was a free choice, I decided to make a React website to make the different API calls.

**This page allows you to:**

* Add/Remove/Update persons and events in the MongoDB
* Make new registrations
* List each person and their total cost
* List each event name and type
