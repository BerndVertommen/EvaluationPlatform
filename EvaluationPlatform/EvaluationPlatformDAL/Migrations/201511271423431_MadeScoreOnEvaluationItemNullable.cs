namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MadeScoreOnEvaluationItemNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.EvaluationItems", "Score", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.EvaluationItems", "Score", c => c.Int(nullable: false));
        }
    }
}
