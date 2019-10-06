using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace aspnetBackend.Models {
    public class Registration {
        public int Id;
        public string firstName { get; set; }
        public string surName { get; set; }
        public string EventName { get; set; }
        public string EventDate { get; set; }
    }
}
