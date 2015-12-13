namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedStudyPlanFromTeacher : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Teachers", "StudyPlan_Id", "dbo.StudyPlans");
            DropIndex("dbo.Teachers", new[] { "StudyPlan_Id" });
            DropColumn("dbo.Teachers", "StudyPlan_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Teachers", "StudyPlan_Id", c => c.Guid());
            CreateIndex("dbo.Teachers", "StudyPlan_Id");
            AddForeignKey("dbo.Teachers", "StudyPlan_Id", "dbo.StudyPlans", "Id");
        }
    }
}
