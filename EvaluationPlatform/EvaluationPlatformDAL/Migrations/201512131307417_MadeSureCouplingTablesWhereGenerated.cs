namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MadeSureCouplingTablesWhereGenerated : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Classes", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.Courses", "PrimaryTeacher_Id", "dbo.Teachers");
            DropIndex("dbo.Classes", new[] { "Teacher_Id" });
            CreateTable(
                "dbo.TeacherClasses",
                c => new
                    {
                        Teacher_Id = c.Guid(nullable: false),
                        Class_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Teacher_Id, t.Class_Id })
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id, cascadeDelete: true)
                .ForeignKey("dbo.Classes", t => t.Class_Id, cascadeDelete: true)
                .Index(t => t.Teacher_Id)
                .Index(t => t.Class_Id);
            
            AddColumn("dbo.Courses", "Teacher_Id", c => c.Guid());
            AddColumn("dbo.Teachers", "Course_Id", c => c.Guid());
            CreateIndex("dbo.Courses", "Teacher_Id");
            CreateIndex("dbo.Teachers", "Course_Id");
            AddForeignKey("dbo.Teachers", "Course_Id", "dbo.Courses", "Id");
            AddForeignKey("dbo.Courses", "Teacher_Id", "dbo.Teachers", "Id");
            DropColumn("dbo.Classes", "Teacher_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Classes", "Teacher_Id", c => c.Guid());
            DropForeignKey("dbo.Courses", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.Teachers", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.TeacherClasses", "Class_Id", "dbo.Classes");
            DropForeignKey("dbo.TeacherClasses", "Teacher_Id", "dbo.Teachers");
            DropIndex("dbo.TeacherClasses", new[] { "Class_Id" });
            DropIndex("dbo.TeacherClasses", new[] { "Teacher_Id" });
            DropIndex("dbo.Teachers", new[] { "Course_Id" });
            DropIndex("dbo.Courses", new[] { "Teacher_Id" });
            DropColumn("dbo.Teachers", "Course_Id");
            DropColumn("dbo.Courses", "Teacher_Id");
            DropTable("dbo.TeacherClasses");
            CreateIndex("dbo.Classes", "Teacher_Id");
            AddForeignKey("dbo.Courses", "PrimaryTeacher_Id", "dbo.Teachers", "Id");
            AddForeignKey("dbo.Classes", "Teacher_Id", "dbo.Teachers", "Id");
        }
    }
}
