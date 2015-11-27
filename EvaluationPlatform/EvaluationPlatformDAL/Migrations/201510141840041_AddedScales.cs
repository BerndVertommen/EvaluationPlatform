namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedScales : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Scales",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        MinScore = c.Int(nullable: false),
                        MaxScore = c.Int(nullable: false),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Cources", "Scale_Id", c => c.Guid());
            AddColumn("dbo.EvaluationItems", "Score", c => c.Int(nullable: false));
            AddColumn("dbo.EvaluationItems", "Comment", c => c.String());
            CreateIndex("dbo.Cources", "Scale_Id");
            AddForeignKey("dbo.Cources", "Scale_Id", "dbo.Scales", "Id");
            DropColumn("dbo.AccountRoles", "Description");
            DropColumn("dbo.Accounts", "Description");
            DropColumn("dbo.People", "Description");
            DropColumn("dbo.SchoolYears", "Description");
            DropColumn("dbo.Students", "Description");
            DropColumn("dbo.Teachers", "Description");
            DropColumn("dbo.Evaluations", "Description");
            DropColumn("dbo.EvaluationItems", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.EvaluationItems", "Description", c => c.String());
            AddColumn("dbo.Evaluations", "Description", c => c.String());
            AddColumn("dbo.Teachers", "Description", c => c.String());
            AddColumn("dbo.Students", "Description", c => c.String());
            AddColumn("dbo.SchoolYears", "Description", c => c.String());
            AddColumn("dbo.People", "Description", c => c.String());
            AddColumn("dbo.Accounts", "Description", c => c.String());
            AddColumn("dbo.AccountRoles", "Description", c => c.String());
            DropForeignKey("dbo.Cources", "Scale_Id", "dbo.Scales");
            DropIndex("dbo.Cources", new[] { "Scale_Id" });
            DropColumn("dbo.EvaluationItems", "Comment");
            DropColumn("dbo.EvaluationItems", "Score");
            DropColumn("dbo.Cources", "Scale_Id");
            DropTable("dbo.Scales");
        }
    }
}
