using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using EvaluationPlatformDAL.Generators;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDAL.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<EPDatabase>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EPDatabase context)
        {
            // seed students
            StudentGenerator studentGenerator = new StudentGenerator();
            ICollection<Student> students = studentGenerator.Generate();
            
            
            //seed Classes
            Class class1 = new Class("1NF", new SchoolYear(), students);

            // StudyPlans
            StudyPlan studyPlan1 = new StudyPlan("LeerplanMechanica");

            // GeneralGoals
            studyPlan1.AddGeneralGoal( new GeneralGoal(1, @"De taken en verantwoordelijkheden van de leden van het ‘mechanisch vormgevingsteam’ toelichten.",GenerateGoals(1,5)));
            studyPlan1.AddGeneralGoal( new GeneralGoal(2, @"De eigenheid van de diverse mechanische vormgevingsbedrijven met eigen woorden uitleggen. ", GenerateGoals(1, 6)));
            studyPlan1.AddGeneralGoal( new GeneralGoal(3, @"De mechanische vormgevingsbedrijven in de Belgische en de Vlaamse economische context situeren. ", GenerateGoals(1, 7)));
            studyPlan1.AddGeneralGoal( new GeneralGoal(4, @"Van een mechanisch vormgevend bedrijf de structuur toelichten.", GenerateGoals(1, 5)));
            studyPlan1.AddGeneralGoal(new GeneralGoal(5, @"De kenmerken van een mechanisch vormgevingsbedrijf toelichten.", GenerateGoals(1, 3)));

            Scale fourPointScale = new Scale(0, 3, "Vier-puntschaal[3210]");
            //teachers
            Teacher teacher1 = new Teacher(new Person( "Sneewbal", "VanMechanica"));
            teacher1.AddClass(class1);
            teacher1.AddCource(new Cource("Mechanica", new SchoolYear(), teacher1, fourPointScale));
            teacher1.AddStudypPlan(studyPlan1);

            context.Teachers.Add(teacher1);

            CreateRoles(context);
            CreateAccounts(context);

            context.SaveChanges();
        }


        private IEnumerable<Goal> GenerateGoals(int generalnumber, int numberOfGoals)
        {
            for (int i = 0; i < numberOfGoals; i++)
            {
                yield return new Goal($"testGoal{i} GeneralGoal:{generalnumber}");//c#6 string interpolation   
            }
        }

        private void CreateRoles(EPDatabase context)
        {
            context.AccountRoles.Add(new AccountRole(AccountRoleType.Admin));
            context.AccountRoles.Add(new AccountRole(AccountRoleType.UserRole));
            //context.AccountRoles.Add(new AccountRole(AccountRoleTypes.Developer));
            
        }

        private void CreateAccounts(EPDatabase context)
        {
            // Add DevAccount
            AccountRole devAccountRole =
                context.AccountRoles.FirstOrDefault(r => r.AccountRoleType == AccountRoleType.Developer);
            var devAccount = new Account("Tester","berndvertommen@msn.com",new Person("Test","er"), new AccountRole(AccountRoleType.Developer));
            devAccount.SetPassword("@Dmin123");

            context.Accounts.Add(devAccount);
        }
    }
}
