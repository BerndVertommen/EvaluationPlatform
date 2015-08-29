using System.Data.Entity;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformDAL
{
    public interface IEPDatabase
    {
        IDbSet<Class> Classes { get; set; }
        IDbSet<SchoolYear> SchoolYears { get; set; }
        IDbSet<Student> Students { get; set; }
        IDbSet<Teacher> Teachers { get; set; }
        IDbSet<Cource> Cources { get; set; } 
        IDbSet<Evaluation> Evaluations { get; set; }
        IDbSet<StudyPlan> StudyPlans { get; set; } 
        IDbSet<GeneralGoal> GeneralGoals { get; set; }
        IDbSet<Goal> Goals { get; set; }  
    }
}
