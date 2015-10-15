namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedGeneralCommentOnEvaluation : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Evaluations", "GeneralComment", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Evaluations", "GeneralComment");
        }
    }
}
