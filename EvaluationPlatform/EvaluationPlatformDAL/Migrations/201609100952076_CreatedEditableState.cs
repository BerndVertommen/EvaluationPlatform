namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatedEditableState : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EditableStates",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        EditState = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EditChangeHistoryRecords",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        ChangedAt = c.DateTime(nullable: false),
                        ChangeState = c.Int(nullable: false),
                        ChangedBy_Id = c.Guid(),
                        EditableState_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accounts", t => t.ChangedBy_Id)
                .ForeignKey("dbo.EditableStates", t => t.EditableState_Id)
                .Index(t => t.ChangedBy_Id)
                .Index(t => t.EditableState_Id);
            
            AddColumn("dbo.Evaluations", "EditAbleState_Id", c => c.Guid());
            CreateIndex("dbo.Evaluations", "EditAbleState_Id");
            AddForeignKey("dbo.Evaluations", "EditAbleState_Id", "dbo.EditableStates", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Evaluations", "EditAbleState_Id", "dbo.EditableStates");
            DropForeignKey("dbo.EditChangeHistoryRecords", "EditableState_Id", "dbo.EditableStates");
            DropForeignKey("dbo.EditChangeHistoryRecords", "ChangedBy_Id", "dbo.Accounts");
            DropIndex("dbo.EditChangeHistoryRecords", new[] { "EditableState_Id" });
            DropIndex("dbo.EditChangeHistoryRecords", new[] { "ChangedBy_Id" });
            DropIndex("dbo.Evaluations", new[] { "EditAbleState_Id" });
            DropColumn("dbo.Evaluations", "EditAbleState_Id");
            DropTable("dbo.EditChangeHistoryRecords");
            DropTable("dbo.EditableStates");
        }
    }
}
