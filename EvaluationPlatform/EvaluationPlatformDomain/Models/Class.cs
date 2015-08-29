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

        public virtual ICollection<Student> Students { get; set; }

        public Class()
        {
            
        }

        public Class(string discription, SchoolYear schoolYear, ICollection<Student> students )
        {
            Discription = discription;
            SchoolYear = schoolYear;
            Students = students;
        }
    }
}
