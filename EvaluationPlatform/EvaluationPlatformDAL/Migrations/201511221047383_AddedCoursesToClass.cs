namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedCoursesToClass : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CourseClasses",
                c => new
                    {
                        Course_Id = c.Guid(nullable: false),
                        Class_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.Course_Id, t.Class_Id })
                .ForeignKey("dbo.Courses", t => t.Course_Id, cascadeDelete: true)
                .ForeignKey("dbo.Classes", t => t.Class_Id, cascadeDelete: true)
                .Index(t => t.Course_Id)
                .Index(t => t.Class_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CourseClasses", "Class_Id", "dbo.Classes");
            DropForeignKey("dbo.CourseClasses", "Course_Id", "dbo.Courses");
            DropIndex("dbo.CourseClasses", new[] { "Class_Id" });
            DropIndex("dbo.CourseClasses", new[] { "Course_Id" });
            DropTable("dbo.CourseClasses");
        }
    }
}
