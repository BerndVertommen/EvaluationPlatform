using System.Collections.Generic;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformDAL.Generators
{
    public class StudentGenerator 
    {

        public ICollection<Student> Generate()
        {
            List<Student> students = new List<Student>()
            {
                new Student(new Person("Dokus", "Zonder Naam")),
                new Student(new Person("Jan", "Zonder Vrees")),
                new Student(new Person("Hertog", "Van Vlaanderen")),
                new Student(new Person("Baron", "Van Grembergen")),
                new Student(new Person("Boer", "Stansen")),
                new Student(new Person("Ridder", "Kortenak")),
            };

            return students;
        }
    }
}
