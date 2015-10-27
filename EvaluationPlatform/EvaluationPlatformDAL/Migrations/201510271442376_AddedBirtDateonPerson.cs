namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedBirtDateonPerson : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.People", "BirthDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.People", "BirthDate");
        }
    }
}
