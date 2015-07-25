using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformDAL
{
    public class EPDatabase : DbContext, IEPDatabase
    {
        public IDbSet<Class> Classes { get; set; }
        public IDbSet<Person> Persons { get; set; }
        public IDbSet<SchoolYear> SchoolYears { get; set; }
        public IDbSet<Student> Students { get; set; }
        public IDbSet<Teacher> Teachers { get; set; }

        public EPDatabase()
        {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
            Configuration.AutoDetectChangesEnabled = true;
        }
    }
}
