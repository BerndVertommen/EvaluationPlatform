using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    /// <summary>
    /// Class as in collection of students
    /// </summary>
    public class Class : Entity
    {
        public virtual SchoolYear SchoolYear { get; set; }

        public virtual ICollection<Student> Students { get; private set; }

        public virtual string Description { get; set; }

        public virtual ICollection<Course> Courses { get; private set; }

        public Class()
        {
            Courses = new List<Course>();
        }

        public Class(string description, SchoolYear schoolYear, ICollection<Student> students) : this()
        {
            Description = description;
            SchoolYear = schoolYear;
            Students = students;
        }

        public void AddCourse(Course courseMechanica)
        {
            Courses.Add(courseMechanica);
        }
    }
}
