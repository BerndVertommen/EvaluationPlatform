using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Threading;
using EvaluationPlatformDAL.Generators;
using EvaluationPlatformDomain.Models;
using Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

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

            //teachers
            Teacher teacher1 = new Teacher("Sneewbal", "VanMechanica");
            teacher1.AddClass(class1);
            teacher1.AddCource(new Cource("Mechanica", new SchoolYear(), teacher1));
            teacher1.AddStudypPlan(studyPlan1);

            context.Teachers.Add(teacher1);

            AddAccount(context);

            context.SaveChanges();
        }

        private void AddAccount(EPDatabase context)
        {
            var manager = new UserManager<Account>(new UserStore<Account>(context));
            var account = new Account()
            {
                UserName = "Admin",
                Email = "berndvertommen@msn.com",
                EmailConfirmed = true,
                FirstName = "Admin",
                LastName = "Istrator",
                RegisterDate = DateTime.Now.AddYears(-1)
            };
            manager.Create(account, "admin");

            context.Users.Add(account);
        }

        private IEnumerable<Goal> GenerateGoals(int generalnumber, int numberOfGoals)
        {
            for (int i = 0; i < numberOfGoals; i++)
            {
                yield return new Goal($"testGoal{i} GeneralGoal:{generalnumber}");//c#6 string interpolation   
            }
        }
    }
}
