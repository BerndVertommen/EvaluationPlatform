using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class Student : Entity
    {
        public Person Person { get; set; }

        public Student(Person person)
        {
            Person = person;
        }
    }
}
