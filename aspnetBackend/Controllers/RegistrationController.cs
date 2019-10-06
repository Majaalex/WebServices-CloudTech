using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using aspnetBackend.Models;
using aspnetBackend.Resources;
using System.Net;
using System.Net.Http;
namespace aspnetBackend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase {
        
        // GET: api/Registration
        [HttpGet]
        public Task<List<Registration>> Get() {
            RegistrationDb db = new RegistrationDb();
            return db.GetRegistrationsAsync();
        }

        // GET: api/Registration/5
        [HttpGet("{id}", Name = "Get")]
        public Task<List<Registration>> Get(int id) {
            RegistrationDb db = new RegistrationDb();
            return db.GetRegistration(id);
        }

        // POST: api/Registration
        [HttpPost]
        public HttpResponseMessage Post([FromBody] Register body) {
            RegistrationDb db = new RegistrationDb();
            return db.postRegistration(body);
        }

        // PUT: api/Registration/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody] Register body) {
            RegistrationDb db = new RegistrationDb();
            return db.PutRegistration(id, body);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public HttpResponseMessage Delete(int id) {
            RegistrationDb db = new RegistrationDb();
            return db.DeleteRegistration(id);
        }
    }
}
