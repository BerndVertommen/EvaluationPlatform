using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class Student : Person
    {
        
        public Student(Person person): base(person.FirstName,person.LastName)
        {}

        public Student()
        {
        }
    }
}
