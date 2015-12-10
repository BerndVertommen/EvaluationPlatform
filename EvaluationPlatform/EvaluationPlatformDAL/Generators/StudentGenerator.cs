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

        public ICollection<Student> GenerateVerzorgingStudents()
        {
            List<Student> students = new List<Student>()
            {
                new Student(new Person("Jill", "Cools",new DateTime(2000,10,10))),
                new Student(new Person("Rani", "Aimable",new DateTime(2000,10,10))),
                new Student(new Person("Morgane", "Croonenborghs",new DateTime(2000,10,10))),
                new Student(new Person("Kim", "Eelen",new DateTime(2000,10,10))),
                new Student(new Person("Jana", "Keuppens",new DateTime(2000,10,10))),
                new Student(new Person("Xena", "Labro",new DateTime(2000,10,10))),
                new Student(new Person("Laïs", "Lessent",new DateTime(2000,10,10))),
                new Student(new Person("Britt", "Van Geel",new DateTime(2000,10,10))),
                new Student(new Person("Emma", "Van Hattem",new DateTime(2000,10,10))),
                new Student(new Person("Zoë", "Van Houdt",new DateTime(2000,10,10))),
                new Student(new Person("Britt", "Van Looy",new DateTime(2000,10,10))),
                new Student(new Person("Marthe", "Verhaert",new DateTime(2000,10,10))),
                new Student(new Person("Shaquane", "Kortenak",new DateTime(2000,10,10)))
            };

            return students;
        } 
    }
}
