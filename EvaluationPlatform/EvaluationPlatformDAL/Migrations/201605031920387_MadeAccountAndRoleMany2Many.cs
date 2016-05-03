namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MadeAccountAndRoleMany2Many : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AccountRoles", "Account_Id", "dbo.Accounts");
            DropIndex("dbo.AccountRoles", new[] { "Account_Id" });
            CreateTable(
                "dbo.AccountRoleAccounts",
                c => new
                    {
                        AccountRole_Id = c.Guid(nullable: false),
                        Account_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.AccountRole_Id, t.Account_Id })
                .ForeignKey("dbo.AccountRoles", t => t.AccountRole_Id, cascadeDelete: true)
                .ForeignKey("dbo.Accounts", t => t.Account_Id, cascadeDelete: true)
                .Index(t => t.AccountRole_Id)
                .Index(t => t.Account_Id);
            
            DropColumn("dbo.AccountRoles", "Account_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AccountRoles", "Account_Id", c => c.Guid());
            DropForeignKey("dbo.AccountRoleAccounts", "Account_Id", "dbo.Accounts");
            DropForeignKey("dbo.AccountRoleAccounts", "AccountRole_Id", "dbo.AccountRoles");
            DropIndex("dbo.AccountRoleAccounts", new[] { "Account_Id" });
            DropIndex("dbo.AccountRoleAccounts", new[] { "AccountRole_Id" });
            DropTable("dbo.AccountRoleAccounts");
            CreateIndex("dbo.AccountRoles", "Account_Id");
            AddForeignKey("dbo.AccountRoles", "Account_Id", "dbo.Accounts", "Id");
        }
    }
}
