using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformDAL
{
    public interface IEPDatabase
    {
        IDbSet<Class> Classes { get; set; }
        IDbSet<Person> Persons { get; set; }
        IDbSet<SchoolYear> SchoolYears { get; set; }
        IDbSet<Student> Students { get; set; }
        IDbSet<Teacher> Teachers{ get; set; }
        }
}
