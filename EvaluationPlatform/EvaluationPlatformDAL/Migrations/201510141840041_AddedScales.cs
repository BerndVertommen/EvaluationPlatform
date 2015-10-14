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
                        Discription = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Cources", "Scale_Id", c => c.Guid());
            AddColumn("dbo.EvaluationItems", "Score", c => c.Int(nullable: false));
            AddColumn("dbo.EvaluationItems", "Comment", c => c.String());
            CreateIndex("dbo.Cources", "Scale_Id");
            AddForeignKey("dbo.Cources", "Scale_Id", "dbo.Scales", "Id");
            DropColumn("dbo.AccountRoles", "Discription");
            DropColumn("dbo.Accounts", "Discription");
            DropColumn("dbo.People", "Discription");
            DropColumn("dbo.SchoolYears", "Discription");
            DropColumn("dbo.Students", "Discription");
            DropColumn("dbo.Teachers", "Discription");
            DropColumn("dbo.Evaluations", "Discription");
            DropColumn("dbo.EvaluationItems", "Discription");
        }
        
        public override void Down()
        {
            AddColumn("dbo.EvaluationItems", "Discription", c => c.String());
            AddColumn("dbo.Evaluations", "Discription", c => c.String());
            AddColumn("dbo.Teachers", "Discription", c => c.String());
            AddColumn("dbo.Students", "Discription", c => c.String());
            AddColumn("dbo.SchoolYears", "Discription", c => c.String());
            AddColumn("dbo.People", "Discription", c => c.String());
            AddColumn("dbo.Accounts", "Discription", c => c.String());
            AddColumn("dbo.AccountRoles", "Discription", c => c.String());
            DropForeignKey("dbo.Cources", "Scale_Id", "dbo.Scales");
            DropIndex("dbo.Cources", new[] { "Scale_Id" });
            DropColumn("dbo.EvaluationItems", "Comment");
            DropColumn("dbo.EvaluationItems", "Score");
            DropColumn("dbo.Cources", "Scale_Id");
            DropTable("dbo.Scales");
        }
    }
}
