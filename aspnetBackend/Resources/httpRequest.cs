using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using aspnetBackend.Models;
using Nancy.Json;

namespace aspnetBackend.Resources {
    public class httpRequest {
        static HttpClient client = new HttpClient();
        static string baseUrl = "http://localhost:3003/api/";
        static string baseUrlAzure = "https://mongodb-backend.azurewebsites.net/api/";

        public static async Task<EventObj> GetEvent(string id) {
            Uri uri = new Uri(baseUrl + "events/" + id);
            HttpResponseMessage response = await client.GetAsync(uri).ConfigureAwait(false);
            var serializer = new JavaScriptSerializer();
            var content = response.Content.ReadAsStringAsync().Result;
            Console.WriteLine("Person:  " + content);
            var deserializedResult = serializer.Deserialize<EventObj>(content);
            return deserializedResult;
        }

        public static async Task<Person> GetPerson(string id) {
            Uri uri = new Uri(baseUrl + "persons/" + id);
            HttpResponseMessage response = await client.GetAsync(uri).ConfigureAwait(false);
            var serializer = new JavaScriptSerializer();
            var content = response.Content.ReadAsStringAsync().Result;
            Console.WriteLine("Event:  " + content);
            var deserializedResult = serializer.Deserialize<Person>(content);
            return deserializedResult;
        }


    }


}
