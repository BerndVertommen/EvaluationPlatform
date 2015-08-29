using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class Teacher : Person
    {
        public virtual ICollection<Class> Classes { get; set; }
        public virtual ICollection<Evaluation> Evaluations { get; set; } 
        public virtual ICollection<Cource> Cources { get; set; }

        public Teacher()
        {
        }
    }
}
