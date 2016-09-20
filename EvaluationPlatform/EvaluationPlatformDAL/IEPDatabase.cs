using System;
using System.Data.Entity;
using System.Security.Cryptography.X509Certificates;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDAL
{
    public interface IEPDatabase
    {
        IDbSet<Class> Classes { get; set; }
        IDbSet<SchoolYear> SchoolYears { get; set; }
        IDbSet<Person> Persons{ get; set; }
        IDbSet<Student> Students { get; set; }
        IDbSet<Teacher> Teachers { get; set; }
        IDbSet<Course> Courses { get; set; } 
        IDbSet<Evaluation> Evaluations { get; set; }
        IDbSet<StudyPlan> StudyPlans { get; set; } 
        IDbSet<GeneralGoal> GeneralGoals { get; set; }
        IDbSet<Goal> Goals { get; set; }  
        IDbSet<Account> Accounts { get; set; } 
        IDbSet<AccountRole> AccountRoles { get; set; }
        IDbSet<EvaluationTemplate> EvaluationTemplates { get; set; }
        IDbSet<Scale> Scales { get; set; }


        Teacher GetTeacherForAccount(Guid? accountId);

        SchoolYear GetCurrentSchoolyear();

        int SaveChanges();


    }
}
