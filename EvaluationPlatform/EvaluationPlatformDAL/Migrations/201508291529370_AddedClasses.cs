namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedClasses : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Students", "Person_Id", "dbo.People");
            DropIndex("dbo.Students", new[] { "Person_Id" });
            CreateTable(
                "dbo.Cources",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(),
                        PrimaryTeacher_Id = c.Guid(),
                        SchoolYear_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Teachers", t => t.PrimaryTeacher_Id)
                .ForeignKey("dbo.SchoolYears", t => t.SchoolYear_Id)
                .Index(t => t.PrimaryTeacher_Id)
                .Index(t => t.SchoolYear_Id);
            
            CreateTable(
                "dbo.Evaluations",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        EvaluationDate = c.DateTime(nullable: false),
                        Description = c.String(),
                        Cource_Id = c.Guid(),
                        Student_Id = c.Guid(),
                        Teacher_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cources", t => t.Cource_Id)
                .ForeignKey("dbo.Students", t => t.Student_Id)
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id)
                .Index(t => t.Cource_Id)
                .Index(t => t.Student_Id)
                .Index(t => t.Teacher_Id);
            
            CreateTable(
                "dbo.EvaluationItems",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(),
                        Goal_Id = c.Guid(),
                        Evaluation_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Goals", t => t.Goal_Id)
                .ForeignKey("dbo.Evaluations", t => t.Evaluation_Id)
                .Index(t => t.Goal_Id)
                .Index(t => t.Evaluation_Id);
            
            CreateTable(
                "dbo.Goals",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(),
                        GeneralGoal_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GeneralGoals", t => t.GeneralGoal_Id)
                .Index(t => t.GeneralGoal_Id);
            
            CreateTable(
                "dbo.StudyPlans",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(),
                        Teacher_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id)
                .Index(t => t.Teacher_Id);
            
            CreateTable(
                "dbo.GeneralGoals",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        GoalNumber = c.Int(nullable: false),
                        Description = c.String(),
                        StudyPlan_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.StudyPlans", t => t.StudyPlan_Id)
                .Index(t => t.StudyPlan_Id);
            
            AddColumn("dbo.Classes", "Description", c => c.String());
            AddColumn("dbo.SchoolYears", "Description", c => c.String());
            AddColumn("dbo.Students", "FirstName", c => c.String());
            AddColumn("dbo.Students", "LastName", c => c.String());
            AddColumn("dbo.Students", "Description", c => c.String());
            AddColumn("dbo.Teachers", "FirstName", c => c.String());
            AddColumn("dbo.Teachers", "LastName", c => c.String());
            AddColumn("dbo.Teachers", "Description", c => c.String());
            DropColumn("dbo.Classes", "Name");
            DropColumn("dbo.Students", "Person_Id");
            DropTable("dbo.People");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.People",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Students", "Person_Id", c => c.Guid());
            AddColumn("dbo.Classes", "Name", c => c.String());
            DropForeignKey("dbo.Cources", "SchoolYear_Id", "dbo.SchoolYears");
            DropForeignKey("dbo.StudyPlans", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.GeneralGoals", "StudyPlan_Id", "dbo.StudyPlans");
            DropForeignKey("dbo.Goals", "GeneralGoal_Id", "dbo.GeneralGoals");
            DropForeignKey("dbo.Evaluations", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.Evaluations", "Student_Id", "dbo.Students");
            DropForeignKey("dbo.EvaluationItems", "Evaluation_Id", "dbo.Evaluations");
            DropForeignKey("dbo.EvaluationItems", "Goal_Id", "dbo.Goals");
            DropForeignKey("dbo.Evaluations", "Cource_Id", "dbo.Cources");
            DropForeignKey("dbo.Cources", "PrimaryTeacher_Id", "dbo.Teachers");
            DropIndex("dbo.GeneralGoals", new[] { "StudyPlan_Id" });
            DropIndex("dbo.StudyPlans", new[] { "Teacher_Id" });
            DropIndex("dbo.Goals", new[] { "GeneralGoal_Id" });
            DropIndex("dbo.EvaluationItems", new[] { "Evaluation_Id" });
            DropIndex("dbo.EvaluationItems", new[] { "Goal_Id" });
            DropIndex("dbo.Evaluations", new[] { "Teacher_Id" });
            DropIndex("dbo.Evaluations", new[] { "Student_Id" });
            DropIndex("dbo.Evaluations", new[] { "Cource_Id" });
            DropIndex("dbo.Cources", new[] { "SchoolYear_Id" });
            DropIndex("dbo.Cources", new[] { "PrimaryTeacher_Id" });
            DropColumn("dbo.Teachers", "Description");
            DropColumn("dbo.Teachers", "LastName");
            DropColumn("dbo.Teachers", "FirstName");
            DropColumn("dbo.Students", "Description");
            DropColumn("dbo.Students", "LastName");
            DropColumn("dbo.Students", "FirstName");
            DropColumn("dbo.SchoolYears", "Description");
            DropColumn("dbo.Classes", "Description");
            DropTable("dbo.GeneralGoals");
            DropTable("dbo.StudyPlans");
            DropTable("dbo.Goals");
            DropTable("dbo.EvaluationItems");
            DropTable("dbo.Evaluations");
            DropTable("dbo.Cources");
            CreateIndex("dbo.Students", "Person_Id");
            AddForeignKey("dbo.Students", "Person_Id", "dbo.People", "Id");
        }
    }
}
