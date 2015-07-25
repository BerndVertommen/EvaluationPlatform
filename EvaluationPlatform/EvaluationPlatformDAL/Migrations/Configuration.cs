using System.Collections;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using EvaluationPlatformDAL.Generators;
using EvaluationPlatformDomain.Models;

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
            // seed classes
            StudentGenerator studentGenerator = new StudentGenerator();
            ICollection<Student> students = studentGenerator.Generate();

            context.Classes.Add(new Class("1NF", new SchoolYear(), students));
            //ClassGenerator classGenerator = new ClassGenerator();
            //foreach (Class klas in classGenerator.Generate())
            //{
            //    context.Classes.Add(klas);
            //}

            context.SaveChanges();
        }
    }
}
