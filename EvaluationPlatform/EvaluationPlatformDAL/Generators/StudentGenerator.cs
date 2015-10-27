using System.Collections.Generic;
using EvaluationPlatformDomain.Models;
using System;

namespace EvaluationPlatformDAL.Generators
{
    public class StudentGenerator 
    {

        public ICollection<Student> Generate()
        {
            List<Student> students = new List<Student>()
            {
                new Student(new Person("Dokus", "Zonder Naam",new DateTime(2000,10,10))),
                new Student(new Person("Jan", "Zonder Vrees",new DateTime(2000,10,10))),
                new Student(new Person("Hertog", "Van Vlaanderen",new DateTime(2000,10,10))),
                new Student(new Person("Baron", "Van Grembergen",new DateTime(2000,10,10))),
                new Student(new Person("Boer", "Stansen",new DateTime(2000,10,10))),
                new Student(new Person("Ridder", "Kortenak",new DateTime(2000,10,10)))
            };

            return students;
        }
    }
}
