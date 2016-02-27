namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedIndexOnUserNameForAccount : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Accounts", "Username", c => c.String(nullable: false, maxLength: 60));
            CreateIndex("dbo.Accounts", "Username", unique: true, name: "IX_UserName");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Accounts", "IX_UserName");
            AlterColumn("dbo.Accounts", "Username", c => c.String());
        }
    }
}
