namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedAccountRoles : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AccountRoles",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        AccountRoleTypes = c.Int(nullable: false),
                        Discription = c.String(),
                        Account_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accounts", t => t.Account_Id)
                .Index(t => t.Account_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AccountRoles", "Account_Id", "dbo.Accounts");
            DropIndex("dbo.AccountRoles", new[] { "Account_Id" });
            DropTable("dbo.AccountRoles");
        }
    }
}
