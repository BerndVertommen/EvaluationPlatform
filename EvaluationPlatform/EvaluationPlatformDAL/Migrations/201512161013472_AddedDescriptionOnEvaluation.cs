namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDescriptionOnEvaluation : DbMigration
    {
        public override void Up()
        {
            // had to remove error in migrations probably => column is present on evaluations table
            //AddColumn("dbo.Evaluations", "Description", c => c.String());
        }
        
        public override void Down()
        {
            //DropColumn("dbo.Evaluations", "Description");
        }
    }
}
