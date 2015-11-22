namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RenamedCourceToCourse : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Evaluations", name: "Cource_Id", newName: "Course_Id");
            RenameIndex(table: "dbo.Evaluations", name: "IX_Cource_Id", newName: "IX_Course_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Evaluations", name: "IX_Course_Id", newName: "IX_Cource_Id");
            RenameColumn(table: "dbo.Evaluations", name: "Course_Id", newName: "Cource_Id");
        }
    }
}
