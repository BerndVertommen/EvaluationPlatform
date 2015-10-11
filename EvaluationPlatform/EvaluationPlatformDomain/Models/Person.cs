namespace EvaluationPlatformDomain.Models
{
    public class Person : Entity
    {
        public virtual string FirstName{ get; set; }
        public virtual string LastName { get; set; }


        public Person(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public Person()
        {
        }
    }
}
