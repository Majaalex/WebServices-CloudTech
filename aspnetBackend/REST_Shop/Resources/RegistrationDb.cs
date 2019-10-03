using Nancy.Json;
using aspnetBackend.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace aspnetBackend.Resources {
    public class RegistrationDb {
        private SqlConnection sqlConn;

        public bool OpenConnection() {
            // Add MultipleActiveResultSets=true;
            sqlConn = new SqlConnection("YourStringHere");
            try {
                sqlConn.Open();
                return true;
            } catch (Exception e) {
                return false;
            }
        }

        // Get registrations
        public async Task<List<Registration>> GetRegistrationsAsync() {
            List<Registration> registrations = new List<Registration>();
            Dictionary<string, EventObj> eventList = new Dictionary<string, EventObj>();
            Dictionary<string, Person> personList = new Dictionary<string, Person>();
            if (OpenConnection() == true) {
                SqlCommand eventQuery = new SqlCommand("SELECT DISTINCT Event FROM RegistrationsTB;", sqlConn);

                try {
                    SqlDataReader eventReader = eventQuery.ExecuteReader();
                    while (eventReader.Read()) {
                        EventObj ei = await httpRequest.GetEvent(eventReader.GetString(0)).ConfigureAwait(false);
                        EventObj eventInfo = await httpRequest.GetEvent(eventReader.GetString(0)).ConfigureAwait(false);
                        eventList.Add(eventInfo.id, eventInfo);
                    }
                } catch (Exception e) {
                    Console.WriteLine("Error selecting events: " + e.Message);
                }

                SqlCommand personQuery = new SqlCommand("SELECT DISTINCT Person FROM RegistrationsTB;", sqlConn);
                try {
                    SqlDataReader personReader = personQuery.ExecuteReader();
                    while (personReader.Read()) {
                        Person personInfo = await httpRequest.GetPerson(personReader.GetString(0)).ConfigureAwait(false);
                        personList.Add(personInfo.id, personInfo);
                    }
                } catch (Exception e) {
                    Console.WriteLine("Error selecting persons: " + e.Message);
                }

                SqlCommand query = new SqlCommand("SELECT ID, Person, Event FROM RegistrationsTB;", sqlConn);
                try {
                    SqlDataReader reader = query.ExecuteReader();
                    while (reader.Read()) {
                        Registration p = new Registration();
                        p.Id = reader.GetInt32(0);
                        string eventInfo = reader.GetString(2);
                        string personInfo = reader.GetString(1);
                        p.firstName = personList[personInfo].firstName;
                        p.surName = personList[personInfo].surName;
                        p.EventName = eventList[eventInfo].name;
                        p.EventDate = eventList[eventInfo].date;
                        registrations.Add(p);
                    }
                } catch (Exception e) {
                    System.Diagnostics.Debug.WriteLine("Error selecting all registrations: " + e.Message);
                }
            }
            sqlConn.Dispose();
            return registrations;
        }
        // Get specific registration
        public async Task<List<Registration>> GetRegistration(int id) {
            List<Registration> registrations = new List<Registration>();

            if (OpenConnection() == true) {
                SqlCommand query = new SqlCommand("SELECT ID, Person, Event FROM RegistrationsTB WHERE ID = " + id + ";", sqlConn);

                try {
                    SqlDataReader reader = query.ExecuteReader();
                    while (reader.Read()) {
                        EventObj eventInfo = await httpRequest.GetEvent(reader.GetString(2)).ConfigureAwait(false);
                        Person personInfo = await httpRequest.GetPerson(reader.GetString(1)).ConfigureAwait(false);
                        Registration p = new Registration();
                        p.Id = reader.GetInt32(0);
                        p.firstName = personInfo.firstName;
                        p.surName = personInfo.surName;
                        p.EventName = eventInfo.name;
                        p.EventDate = eventInfo.date;
                        registrations.Add(p);
                    }
                } catch (Exception e) {
                    System.Diagnostics.Debug.WriteLine("Error selecting all registrations: " + e.Message);
                }
            }
            sqlConn.Dispose();
            return registrations;
        }
        // Post new registration
        public HttpResponseMessage PostRegistration(Register body) {
            if (body.Person != null) {
                string sqlQuery = "INSERT INTO RegistrationsTB (Person, Event)" +
                        "VALUES('" + body.Person + "','" + body.Event + "');";
                //return SqlQuery(sqlQuery);
                if (OpenConnection() == true) {
                    SqlCommand query = new SqlCommand(sqlQuery, sqlConn);
                    try {
                        query.ExecuteNonQuery();
                    } catch (Exception e) {
                        System.Diagnostics.Debug.WriteLine("Error selecting all registrations: " + e.Message);
                        sqlConn.Dispose();
                        return new HttpResponseMessage(HttpStatusCode.BadRequest);
                    }
                    sqlConn.Dispose();
                    return new HttpResponseMessage(HttpStatusCode.NoContent);
                } else {
                    sqlConn.Dispose();
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }
            }
            sqlConn.Dispose();
            return new HttpResponseMessage(HttpStatusCode.BadRequest);


        }
        public HttpResponseMessage postRegistration(Register body) {
            if (OpenConnection() == true) {
                string sqlString = "INSERT INTO RegistrationsTB (Person, Event) VALUES('" + body.Person + "','" + body.Event + "');";
                SqlCommand query = new SqlCommand(sqlString, sqlConn);
                try {
                    query.ExecuteNonQuery();
                } catch (Exception e) {
                    sqlConn.Dispose();
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }
                sqlConn.Dispose();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            sqlConn.Dispose();
            return new HttpResponseMessage(HttpStatusCode.InternalServerError);

        }

        public HttpResponseMessage PutRegistration(int id, Register body) {
            if (OpenConnection() == true) {
                Console.WriteLine("PUTTING IT UP: ID: " + id + " Body: " + body);
                string sqlQuery =
                    "UPDATE RegistrationsTB " +
                    "SET Person = '" + body.Person + "', Event ='" + body.Event + "' " +
                    "WHERE ID = " + id + ";";
                SqlCommand query = new SqlCommand(sqlQuery, sqlConn);
                //SqlQuery(sqlQuery);
                try {
                    query.ExecuteNonQuery();
                    sqlConn.Dispose();
                    return new HttpResponseMessage(HttpStatusCode.NotFound);
                } catch (Exception e) {
                    System.Diagnostics.Debug.WriteLine("Error in put: ", e.Message);
                }
                sqlConn.Dispose();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            sqlConn.Dispose();
            return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            
        }

        public HttpResponseMessage DeleteRegistration(int id) {
            try {
                string sqlQuery = "DELETE FROM RegistrationsTB WHERE ID = " + id + ";";
                SqlQuery(sqlQuery);
            } catch (Exception e) {
                sqlConn.Dispose();
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        HttpResponseMessage SqlQuery(string sqlQuery) {
            if (OpenConnection() == true) {
                SqlCommand query = new SqlCommand(sqlQuery, sqlConn);
                try {
                    query.ExecuteNonQuery();
                } catch (Exception e) {
                    System.Diagnostics.Debug.WriteLine("Error completing the query: " + e.Message);
                    sqlConn.Dispose();
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }
                sqlConn.Dispose();
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            } else {
                sqlConn.Dispose();
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

        public async Task<List<PersonCost>> GetCostsPerPerson() {
            List<PersonCost> registrations = new List<PersonCost>();

            if (OpenConnection() == true) {
                SqlCommand query = new SqlCommand("SELECT DISTINCT Person FROM RegistrationsTB;", sqlConn);
                try {
                    SqlDataReader reader = query.ExecuteReader();
                    while (reader.Read()) {
                        Person personInfo = await httpRequest.GetPerson(reader.GetString(0)).ConfigureAwait(false);
                        PersonCost pc = new PersonCost();
                        pc.firstName = personInfo.firstName;
                        pc.surName = personInfo.surName;
                        pc.totalCost = await GetCost(reader.GetString(0)).ConfigureAwait(false);
                        registrations.Add(pc);
                    }
                } catch (Exception e) {
                    System.Diagnostics.Debug.WriteLine("Error selecting distinct people: " + e.Message);
                }
            }
            sqlConn.Dispose();
            return registrations;
        }

        public async Task<int> GetCost(string id) {
            int totalCost = 0;
            if (OpenConnection() == true) {
                SqlCommand query = new SqlCommand("SELECT Event FROM RegistrationsTB WHERE Person = '" + id + "';", sqlConn);
                try {
                    SqlDataReader reader = query.ExecuteReader();
                    while (reader.Read()) {
                        EventObj eventInfo = await httpRequest.GetEvent(reader.GetString(0)).ConfigureAwait(false);
                        int participants = await GetParticipants(eventInfo.id).ConfigureAwait(false);
                        totalCost += (eventInfo.totalCost / participants);
                    }
                } catch (Exception e) {
                    System.Diagnostics.Debug.WriteLine("Error selecting events: " + e.Message);
                }
            }
            sqlConn.Dispose();
            return totalCost;
        }

        public async Task<int> GetParticipants(string id) {
            int participants = 0;
            if (OpenConnection() == true) {
                SqlCommand query = new SqlCommand("SELECT count(Person) FROM RegistrationsTB WHERE Event = '" + id + "';", sqlConn);
                try {
                    participants = (int)query.ExecuteScalar();
                } catch (Exception e) {
                    System.Diagnostics.Debug.WriteLine("Error selecting all participants: " + e.Message);
                }
            }
            sqlConn.Dispose();
            return participants;
        }
    }
}
