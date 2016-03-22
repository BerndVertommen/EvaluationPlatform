namespace EvaluationPlatformDomain.Models
{
    public class Goal : Entity // lesdoel
    {
        public string Description { get; set; }

        /// <summary>
        /// Groupname allows the user to group goals by a name. 
        /// This allows them to filter in a larger list of goals.
        /// </summary>
        public string Groupname { get; set; }

        public Goal()
        {
            
        }

        public Goal(string description)
        {
            Description = description;
        }

        public Goal(string description, string groupname)
        {
            Description = description;
            Groupname = groupname;
        }
    }
}