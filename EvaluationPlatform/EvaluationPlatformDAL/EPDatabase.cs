using System;
using System.Data.Entity;
using System.Linq;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDAL
{
    public class EPDatabase : DbContext , IEPDatabase
    {
        //public IDbSet<Account> Accounts { get; set; } 
        // Project
        public IDbSet<Class> Classes { get; set; }
        public IDbSet<SchoolYear> SchoolYears { get; set; }
        public IDbSet<Person> Persons { get; set; }
        public IDbSet<Student> Students { get; set; }
        public IDbSet<Teacher> Teachers { get; set; }
        public IDbSet<Course> Courses { get; set; }
        public IDbSet<Evaluation> Evaluations { get; set; }
        public IDbSet<StudyPlan> StudyPlans { get; set; }
        public IDbSet<GeneralGoal> GeneralGoals { get; set; }
        public IDbSet<Goal> Goals { get; set; }
        public IDbSet<Account> Accounts { get; set; }
        public IDbSet<AccountRole> AccountRoles { get; set; }
     

        public IDbSet<Scale> Scales { get; set; } 

        public EPDatabase() : base("EPDatabase")
        {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
            Configuration.AutoDetectChangesEnabled = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudyPlan>().HasMany(c => c.Teachers).WithMany(p => p.StudyPlans);
        }

        public static EPDatabase Create()
        {
            return  new EPDatabase();
        }

        public Teacher GetTeacherForAccount(Guid? accountId)
        {
           return Teachers.FirstOrDefault(
                    t => t.Person.Id == Accounts.FirstOrDefault(a => a.Id == accountId).Person.Id);
        }
    }


}
