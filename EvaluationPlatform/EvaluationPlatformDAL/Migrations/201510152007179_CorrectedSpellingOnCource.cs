namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrectedSpellingOnCource : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Cources", newName: "Courses");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.Courses", newName: "Cources");
        }
    }
}
