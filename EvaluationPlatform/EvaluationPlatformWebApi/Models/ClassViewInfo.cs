using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.Models
{
    public class ClassViewInfo
    {
        public string Name { get; set; }
        public SchoolYear SchoolYear { get; set; }
        public ICollection<Student> Students { get; set; }
    }
}
