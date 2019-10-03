using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using aspnetBackend.Resources;
using aspnetBackend.Models;

namespace aspnetBackend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase {
        RegistrationDb db = new RegistrationDb();
        // GET: api/Person
        [HttpGet]
        public Task<List<PersonCost>> Get() {
            return db.GetCostsPerPerson();
        }
    }
}
