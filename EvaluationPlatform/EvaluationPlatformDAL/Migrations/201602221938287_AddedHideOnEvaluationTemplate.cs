namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedHideOnEvaluationTemplate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EvaluationTemplates", "Hide", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.EvaluationTemplates", "Hide");
        }
    }
}
