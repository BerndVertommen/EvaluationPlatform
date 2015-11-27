namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImplementedEvaluationTemplat : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EvaluationTemplates",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(),
                        Course_Id = c.Guid(),
                        Teacher_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Courses", t => t.Course_Id)
                .ForeignKey("dbo.Teachers", t => t.Teacher_Id)
                .Index(t => t.Course_Id)
                .Index(t => t.Teacher_Id);
            
            CreateTable(
                "dbo.EvaluationSubSections",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Description = c.String(),
                        Weight = c.Int(nullable: false),
                        EvaluationTemplate_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.EvaluationTemplates", t => t.EvaluationTemplate_Id)
                .Index(t => t.EvaluationTemplate_Id);
            
            AddColumn("dbo.Evaluations", "EvaluationTemplate_Id", c => c.Guid());
            AddColumn("dbo.Goals", "EvaluationSubSection_Id", c => c.Guid());
            CreateIndex("dbo.Evaluations", "EvaluationTemplate_Id");
            CreateIndex("dbo.Goals", "EvaluationSubSection_Id");
            AddForeignKey("dbo.Goals", "EvaluationSubSection_Id", "dbo.EvaluationSubSections", "Id");
            AddForeignKey("dbo.Evaluations", "EvaluationTemplate_Id", "dbo.EvaluationTemplates", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EvaluationTemplates", "Teacher_Id", "dbo.Teachers");
            DropForeignKey("dbo.Evaluations", "EvaluationTemplate_Id", "dbo.EvaluationTemplates");
            DropForeignKey("dbo.EvaluationSubSections", "EvaluationTemplate_Id", "dbo.EvaluationTemplates");
            DropForeignKey("dbo.Goals", "EvaluationSubSection_Id", "dbo.EvaluationSubSections");
            DropForeignKey("dbo.EvaluationTemplates", "Course_Id", "dbo.Courses");
            DropIndex("dbo.EvaluationSubSections", new[] { "EvaluationTemplate_Id" });
            DropIndex("dbo.EvaluationTemplates", new[] { "Teacher_Id" });
            DropIndex("dbo.EvaluationTemplates", new[] { "Course_Id" });
            DropIndex("dbo.Goals", new[] { "EvaluationSubSection_Id" });
            DropIndex("dbo.Evaluations", new[] { "EvaluationTemplate_Id" });
            DropColumn("dbo.Goals", "EvaluationSubSection_Id");
            DropColumn("dbo.Evaluations", "EvaluationTemplate_Id");
            DropTable("dbo.EvaluationSubSections");
            DropTable("dbo.EvaluationTemplates");
        }
    }
}
