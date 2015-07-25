using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformDAL.Generators
{
    public class ClassGenerator
    {

        public IEnumerable<Class> Generate()
        {
            List<Class> classes = new List<Class>()
            {
                new Class("1NF",new SchoolYear(),new StudentGenerator().Generate())
            };

            return classes;
        }
    }
}
