namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedNotScoredREason : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Evaluations", "LastUpdated", c => c.DateTime());
            AddColumn("dbo.Evaluations", "Finished", c => c.Boolean(nullable: false));
            AddColumn("dbo.EvaluationItems", "NotScoredReason", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.EvaluationItems", "NotScoredReason");
            DropColumn("dbo.Evaluations", "Finished");
            DropColumn("dbo.Evaluations", "LastUpdated");
        }
    }
}
