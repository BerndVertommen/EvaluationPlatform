namespace EvaluationPlatformDAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedGroupnameToGoal : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Goals", "Groupname", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Goals", "Groupname");
        }
    }
}
