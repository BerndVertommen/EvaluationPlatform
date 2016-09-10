using System;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformDomain.Models
{
    public class Person : Entity
    {
        public virtual string FirstName{ get; set; }
        public virtual string LastName { get; set; }
        public virtual DateTime BirthDate { get; set; }


        public Person(string firstName, string lastName, DateTime birthDate)
        {
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
        }

        public Person()
        {
        }
    }
}
