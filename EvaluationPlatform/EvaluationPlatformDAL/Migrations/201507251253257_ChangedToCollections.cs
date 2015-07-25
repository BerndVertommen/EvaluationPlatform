namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangedToCollections : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Students", "Class_Id", c => c.Guid());
            CreateIndex("dbo.Students", "Class_Id");
            AddForeignKey("dbo.Students", "Class_Id", "dbo.Classes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Students", "Class_Id", "dbo.Classes");
            DropIndex("dbo.Students", new[] { "Class_Id" });
            DropColumn("dbo.Students", "Class_Id");
        }
    }
}
