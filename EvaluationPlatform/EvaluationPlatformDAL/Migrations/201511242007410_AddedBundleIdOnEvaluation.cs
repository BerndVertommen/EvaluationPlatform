namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedBundleIdOnEvaluation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Evaluations", "BundleId", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Evaluations", "BundleId");
        }
    }
}
