namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewAccountModel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.IdentityUserRoles", "IdentityRole_Id", "dbo.IdentityRoles");
            DropForeignKey("dbo.IdentityUserClaims", "Account_Id", "dbo.Accounts");
            DropForeignKey("dbo.IdentityUserLogins", "Account_Id", "dbo.Accounts");
            DropForeignKey("dbo.IdentityUserRoles", "Account_Id", "dbo.Accounts");
            DropForeignKey("dbo.AccountRoles", "Account_Id", "dbo.Accounts");
            DropIndex("dbo.IdentityUserRoles", new[] { "IdentityRole_Id" });
            DropIndex("dbo.IdentityUserRoles", new[] { "Account_Id" });
            DropIndex("dbo.AccountRoles", new[] { "Account_Id" });
            DropIndex("dbo.IdentityUserClaims", new[] { "Account_Id" });
            DropIndex("dbo.IdentityUserLogins", new[] { "Account_Id" });
            DropPrimaryKey("dbo.Accounts");
            CreateTable(
                "dbo.People",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Students", "Person_Id", c => c.Guid());
            AddColumn("dbo.Teachers", "Person_Id", c => c.Guid());
            AddColumn("dbo.Accounts", "RegistrationDate", c => c.DateTime());
            AddColumn("dbo.Accounts", "HashedPassword", c => c.String());
            AddColumn("dbo.Accounts", "Salt", c => c.String());
            AddColumn("dbo.Accounts", "Description", c => c.String());
            AddColumn("dbo.Accounts", "Person_Id", c => c.Guid());
            AddColumn("dbo.AccountRoles", "AccountRoleType", c => c.Int(nullable: false));
            AlterColumn("dbo.Accounts", "Id", c => c.Guid(nullable: false));
            AlterColumn("dbo.AccountRoles", "Account_Id", c => c.Guid());
            AddPrimaryKey("dbo.Accounts", "Id");
            CreateIndex("dbo.AccountRoles", "Account_Id");
            CreateIndex("dbo.Accounts", "Person_Id");
            CreateIndex("dbo.Students", "Person_Id");
            CreateIndex("dbo.Teachers", "Person_Id");
            AddForeignKey("dbo.Accounts", "Person_Id", "dbo.People", "Id");
            AddForeignKey("dbo.Students", "Person_Id", "dbo.People", "Id");
            AddForeignKey("dbo.Teachers", "Person_Id", "dbo.People", "Id");
            AddForeignKey("dbo.AccountRoles", "Account_Id", "dbo.Accounts", "Id");
            DropColumn("dbo.Students", "FirstName");
            DropColumn("dbo.Students", "LastName");
            DropColumn("dbo.Teachers", "FirstName");
            DropColumn("dbo.Teachers", "LastName");
            DropColumn("dbo.Accounts", "FirstName");
            DropColumn("dbo.Accounts", "LastName");
            DropColumn("dbo.Accounts", "RegisterDate");
            DropColumn("dbo.Accounts", "PasswordHash");
            DropColumn("dbo.Accounts", "SecurityStamp");
            DropColumn("dbo.Accounts", "PhoneNumber");
            DropColumn("dbo.Accounts", "PhoneNumberConfirmed");
            DropColumn("dbo.Accounts", "TwoFactorEnabled");
            DropColumn("dbo.Accounts", "LockoutEndDateUtc");
            DropColumn("dbo.Accounts", "LockoutEnabled");
            DropColumn("dbo.Accounts", "AccessFailedCount");
            DropColumn("dbo.AccountRoles", "AccountRoleTypes");
            DropTable("dbo.IdentityRoles");
            DropTable("dbo.IdentityUserRoles");
            DropTable("dbo.IdentityUserClaims");
            DropTable("dbo.IdentityUserLogins");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.IdentityUserLogins",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        LoginProvider = c.String(),
                        ProviderKey = c.String(),
                        Account_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.IdentityUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                        Account_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.IdentityUserRoles",
                c => new
                    {
                        RoleId = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                        IdentityRole_Id = c.String(maxLength: 128),
                        Account_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.RoleId, t.UserId });
            
            CreateTable(
                "dbo.IdentityRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AccountRoles", "AccountRoleTypes", c => c.Int(nullable: false));
            AddColumn("dbo.Accounts", "AccessFailedCount", c => c.Int(nullable: false));
            AddColumn("dbo.Accounts", "LockoutEnabled", c => c.Boolean(nullable: false));
            AddColumn("dbo.Accounts", "LockoutEndDateUtc", c => c.DateTime());
            AddColumn("dbo.Accounts", "TwoFactorEnabled", c => c.Boolean(nullable: false));
            AddColumn("dbo.Accounts", "PhoneNumberConfirmed", c => c.Boolean(nullable: false));
            AddColumn("dbo.Accounts", "PhoneNumber", c => c.String());
            AddColumn("dbo.Accounts", "SecurityStamp", c => c.String());
            AddColumn("dbo.Accounts", "PasswordHash", c => c.String());
            AddColumn("dbo.Accounts", "RegisterDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Accounts", "LastName", c => c.String());
            AddColumn("dbo.Accounts", "FirstName", c => c.String());
            AddColumn("dbo.Teachers", "LastName", c => c.String());
            AddColumn("dbo.Teachers", "FirstName", c => c.String());
            AddColumn("dbo.Students", "LastName", c => c.String());
            AddColumn("dbo.Students", "FirstName", c => c.String());
            DropForeignKey("dbo.AccountRoles", "Account_Id", "dbo.Accounts");
            DropForeignKey("dbo.Teachers", "Person_Id", "dbo.People");
            DropForeignKey("dbo.Students", "Person_Id", "dbo.People");
            DropForeignKey("dbo.Accounts", "Person_Id", "dbo.People");
            DropIndex("dbo.Teachers", new[] { "Person_Id" });
            DropIndex("dbo.Students", new[] { "Person_Id" });
            DropIndex("dbo.Accounts", new[] { "Person_Id" });
            DropIndex("dbo.AccountRoles", new[] { "Account_Id" });
            DropPrimaryKey("dbo.Accounts");
            AlterColumn("dbo.AccountRoles", "Account_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.Accounts", "Id", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.AccountRoles", "AccountRoleType");
            DropColumn("dbo.Accounts", "Person_Id");
            DropColumn("dbo.Accounts", "Description");
            DropColumn("dbo.Accounts", "Salt");
            DropColumn("dbo.Accounts", "HashedPassword");
            DropColumn("dbo.Accounts", "RegistrationDate");
            DropColumn("dbo.Teachers", "Person_Id");
            DropColumn("dbo.Students", "Person_Id");
            DropTable("dbo.People");
            AddPrimaryKey("dbo.Accounts", "Id");
            CreateIndex("dbo.IdentityUserLogins", "Account_Id");
            CreateIndex("dbo.IdentityUserClaims", "Account_Id");
            CreateIndex("dbo.AccountRoles", "Account_Id");
            CreateIndex("dbo.IdentityUserRoles", "Account_Id");
            CreateIndex("dbo.IdentityUserRoles", "IdentityRole_Id");
            AddForeignKey("dbo.AccountRoles", "Account_Id", "dbo.Accounts", "Id");
            AddForeignKey("dbo.IdentityUserRoles", "Account_Id", "dbo.Accounts", "Id");
            AddForeignKey("dbo.IdentityUserLogins", "Account_Id", "dbo.Accounts", "Id");
            AddForeignKey("dbo.IdentityUserClaims", "Account_Id", "dbo.Accounts", "Id");
            AddForeignKey("dbo.IdentityUserRoles", "IdentityRole_Id", "dbo.IdentityRoles", "Id");
        }
    }
}
