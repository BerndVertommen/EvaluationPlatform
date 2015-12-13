namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedManyTomanyTeacherCourses : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Courses", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.Teachers", "Course_Id", "dbo.Courses");
            DropIndex("dbo.Courses", new[] { "Teacher_Id" });
            DropIndex("dbo.Teachers", new[] { "Course_Id" });
            CreateTable(
                "dbo.TeacherCourses",
                c => new
                    {
                        Teacher_Id = c.Guid(nullable: false),
                        Course_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Teacher_Id, t.Course_Id })
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id, cascadeDelete: true)
                .ForeignKey("dbo.Courses", t => t.Course_Id, cascadeDelete: true)
                .Index(t => t.Teacher_Id)
                .Index(t => t.Course_Id);
            
            DropColumn("dbo.Courses", "Teacher_Id");
            DropColumn("dbo.Teachers", "Course_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Teachers", "Course_Id", c => c.Guid());
            AddColumn("dbo.Courses", "Teacher_Id", c => c.Guid());
            DropForeignKey("dbo.TeacherCourses", "Course_Id", "dbo.Courses");
            DropForeignKey("dbo.TeacherCourses", "Teacher_Id", "dbo.Teachers");
            DropIndex("dbo.TeacherCourses", new[] { "Course_Id" });
            DropIndex("dbo.TeacherCourses", new[] { "Teacher_Id" });
            DropTable("dbo.TeacherCourses");
            CreateIndex("dbo.Teachers", "Course_Id");
            CreateIndex("dbo.Courses", "Teacher_Id");
            AddForeignKey("dbo.Teachers", "Course_Id", "dbo.Courses", "Id");
            AddForeignKey("dbo.Courses", "Teacher_Id", "dbo.Teachers", "Id");
        }
    }
}
