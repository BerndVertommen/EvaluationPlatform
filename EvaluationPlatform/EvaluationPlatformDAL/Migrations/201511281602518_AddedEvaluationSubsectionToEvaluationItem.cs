namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedEvaluationSubsectionToEvaluationItem : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EvaluationItems", "EvaluationSubSection_Id", c => c.Guid());
            CreateIndex("dbo.EvaluationItems", "EvaluationSubSection_Id");
            AddForeignKey("dbo.EvaluationItems", "EvaluationSubSection_Id", "dbo.EvaluationSubSections", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EvaluationItems", "EvaluationSubSection_Id", "dbo.EvaluationSubSections");
            DropIndex("dbo.EvaluationItems", new[] { "EvaluationSubSection_Id" });
            DropColumn("dbo.EvaluationItems", "EvaluationSubSection_Id");
        }
    }
}
