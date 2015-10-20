namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MovedStudyplanToCourse : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StudyPlanTeachers", "StudyPlan_Id", "dbo.StudyPlans");
            DropForeignKey("dbo.StudyPlanTeachers", "Teacher_Id", "dbo.Teachers");
            DropIndex("dbo.StudyPlanTeachers", new[] { "StudyPlan_Id" });
            DropIndex("dbo.StudyPlanTeachers", new[] { "Teacher_Id" });
            AddColumn("dbo.Courses", "StudyPlan_Id", c => c.Guid());
            AddColumn("dbo.Teachers", "StudyPlan_Id", c => c.Guid());
            CreateIndex("dbo.Courses", "StudyPlan_Id");
            CreateIndex("dbo.Teachers", "StudyPlan_Id");
            AddForeignKey("dbo.Teachers", "StudyPlan_Id", "dbo.StudyPlans", "Id");
            AddForeignKey("dbo.Courses", "StudyPlan_Id", "dbo.StudyPlans", "Id");
            DropTable("dbo.StudyPlanTeachers");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.StudyPlanTeachers",
                c => new
                    {
                        StudyPlan_Id = c.Guid(nullable: false),
                        Teacher_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.StudyPlan_Id, t.Teacher_Id });
            
            DropForeignKey("dbo.Courses", "StudyPlan_Id", "dbo.StudyPlans");
            DropForeignKey("dbo.Teachers", "StudyPlan_Id", "dbo.StudyPlans");
            DropIndex("dbo.Teachers", new[] { "StudyPlan_Id" });
            DropIndex("dbo.Courses", new[] { "StudyPlan_Id" });
            DropColumn("dbo.Teachers", "StudyPlan_Id");
            DropColumn("dbo.Courses", "StudyPlan_Id");
            CreateIndex("dbo.StudyPlanTeachers", "Teacher_Id");
            CreateIndex("dbo.StudyPlanTeachers", "StudyPlan_Id");
            AddForeignKey("dbo.StudyPlanTeachers", "Teacher_Id", "dbo.Teachers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StudyPlanTeachers", "StudyPlan_Id", "dbo.StudyPlans", "Id", cascadeDelete: true);
        }
    }
}
