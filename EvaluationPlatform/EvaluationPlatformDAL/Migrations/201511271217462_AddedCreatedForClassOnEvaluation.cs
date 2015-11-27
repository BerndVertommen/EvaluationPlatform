namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedCreatedForClassOnEvaluation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Evaluations", "Description", c => c.String());
            AddColumn("dbo.Evaluations", "CreatedForClass_Id", c => c.Guid());
            CreateIndex("dbo.Evaluations", "CreatedForClass_Id");
            AddForeignKey("dbo.Evaluations", "CreatedForClass_Id", "dbo.Classes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Evaluations", "CreatedForClass_Id", "dbo.Classes");
            DropIndex("dbo.Evaluations", new[] { "CreatedForClass_Id" });
            DropColumn("dbo.Evaluations", "CreatedForClass_Id");
            DropColumn("dbo.Evaluations", "Description");
        }
    }
}
