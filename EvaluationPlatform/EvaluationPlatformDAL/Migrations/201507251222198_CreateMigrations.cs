namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateMigrations : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Classes",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        SchoolYear_Id = c.Guid(),
                        Teacher_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SchoolYears", t => t.SchoolYear_Id)
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id)
                .Index(t => t.SchoolYear_Id)
                .Index(t => t.Teacher_Id);
            
            CreateTable(
                "dbo.SchoolYears",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        StartYear = c.Int(nullable: false),
                        EndYear = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.People",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        FirstName = c.String(),
                        LastName = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Students",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Person_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.People", t => t.Person_Id)
                .Index(t => t.Person_Id);
            
            CreateTable(
                "dbo.Teachers",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Classes", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.Students", "Person_Id", "dbo.People");
            DropForeignKey("dbo.Classes", "SchoolYear_Id", "dbo.SchoolYears");
            DropIndex("dbo.Students", new[] { "Person_Id" });
            DropIndex("dbo.Classes", new[] { "Teacher_Id" });
            DropIndex("dbo.Classes", new[] { "SchoolYear_Id" });
            DropTable("dbo.Teachers");
            DropTable("dbo.Students");
            DropTable("dbo.People");
            DropTable("dbo.SchoolYears");
            DropTable("dbo.Classes");
        }
    }
}
