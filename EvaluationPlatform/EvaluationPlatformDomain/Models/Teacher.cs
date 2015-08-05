using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class Teacher : Entity
    {
        public virtual ICollection<Class> Classes { get; set; }

        public Teacher()
        {
        }
    }
}
