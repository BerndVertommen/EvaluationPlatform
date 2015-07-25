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
        public virtual int Year { get; set; }

        public virtual SchoolYear SchoolYear { get; set; }

        public virtual IEnumerable<Student> Students { get; set; }


    }
}
