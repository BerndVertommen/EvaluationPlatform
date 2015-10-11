namespace EvaluationPlatformDomain.Models
{
    public class Student : Entity
    {
        public virtual Person Person { get;  protected set; }

        public Student(Person person)
        {
            Person = person;
        }

        public Student()
        {
        }
    }
}
