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

        public virtual ICollection<Student> Students { get; private set; } = new List<Student>();

        public virtual string Description { get; set; }

        public virtual ICollection<Course> Courses { get; private set; } = new List<Course>();

        public virtual ICollection<Teacher> Teachers { get; } = new List<Teacher>();

        public Class()
        {
            Courses = new List<Course>();
        }

        // Is this acceptable for domain?
        public Class(string description, SchoolYear schoolYear, ICollection<Student> students) : this()
        {
            Description = description;
            SchoolYear = schoolYear;
            Students = students;
        }

        public Class(SchoolYear schoolYear, string description, List<Course> courses) : this()
        {
            SchoolYear = schoolYear;
            Description = description;
            Courses = courses;
        }

        public void AddCourse(Course course)
        {
            if (Courses.Any(c => c.Id == course.Id))
            {
                throw new InvalidOperationException($"Het vak {course.Description} is reeds toegevoegd.");
            }

            Courses.Add(course);
        }

        public void AddStudent(Student student)
        {
            Students.Add(student);
        }

    }
}
