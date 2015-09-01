namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedManyToManyTeachersStudyPlans : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StudyPlans", "Teacher_Id", "dbo.Teachers");
            DropIndex("dbo.StudyPlans", new[] { "Teacher_Id" });
            CreateTable(
                "dbo.StudyPlanTeachers",
                c => new
                    {
                        StudyPlan_Id = c.Guid(nullable: false),
                        Teacher_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.StudyPlan_Id, t.Teacher_Id })
                .ForeignKey("dbo.StudyPlans", t => t.StudyPlan_Id, cascadeDelete: true)
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id, cascadeDelete: true)
                .Index(t => t.StudyPlan_Id)
                .Index(t => t.Teacher_Id);
            
            DropColumn("dbo.StudyPlans", "Teacher_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.StudyPlans", "Teacher_Id", c => c.Guid());
            DropForeignKey("dbo.StudyPlanTeachers", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.StudyPlanTeachers", "StudyPlan_Id", "dbo.StudyPlans");
            DropIndex("dbo.StudyPlanTeachers", new[] { "Teacher_Id" });
            DropIndex("dbo.StudyPlanTeachers", new[] { "StudyPlan_Id" });
            DropTable("dbo.StudyPlanTeachers");
            CreateIndex("dbo.StudyPlans", "Teacher_Id");
            AddForeignKey("dbo.StudyPlans", "Teacher_Id", "dbo.Teachers", "Id");
        }
    }
}
