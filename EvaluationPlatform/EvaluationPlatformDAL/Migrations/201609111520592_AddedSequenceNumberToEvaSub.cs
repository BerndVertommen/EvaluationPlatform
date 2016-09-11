namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedSequenceNumberToEvaSub : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EvaluationSubSections", "SequenceNumber", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.EvaluationSubSections", "SequenceNumber");
        }
    }
}
