using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;
using System.Linq;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDAL
{
    public class EPDatabase : DbContext, IEPDatabase
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
        public IDbSet<EvaluationTemplate> EvaluationTemplates { get; set; }
        public IDbSet<Scale> Scales { get; set; }



        public EPDatabase() : base("EPDatabase")
        {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
            Configuration.AutoDetectChangesEnabled = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<StudyPlan>().HasMany(c => c.).WithMany(p => p.StudyPlans);
            modelBuilder.Entity<Teacher>().HasMany(c => c.Courses).WithMany(p => p.Teachers);
            modelBuilder.Entity<AccountRole>().HasMany(ar => ar.Accounts).WithMany(a => a.AccountRoles);
            // unique value and index for Username on account table
            modelBuilder
                .Entity<Account>()
                .Property(a => a.Username)
                .IsRequired()
                .HasMaxLength(60)
                .HasColumnAnnotation(
                IndexAnnotation.AnnotationName,
                new IndexAnnotation(
                    new IndexAttribute("IX_UserName", 1) { IsUnique = true }));

        }

        public static EPDatabase Create()
        {
            return new EPDatabase();
        }

        public Teacher GetTeacherForAccount(Guid? accountId)
        {
            return Teachers.FirstOrDefault(
                     t => t.Person.Id == Accounts.FirstOrDefault(a => a.Id == accountId).Person.Id);
        }

        public SchoolYear GetCurrentSchoolyear()
        {
            var startSchoolYear = SchoolYear.GetStartYearThisSchoolYear();
            return SchoolYears.FirstOrDefault(x => x.StartYear == startSchoolYear);
        }

    }


}
