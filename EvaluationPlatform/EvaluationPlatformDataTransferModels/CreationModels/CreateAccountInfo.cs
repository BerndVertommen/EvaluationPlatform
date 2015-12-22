using EvaluationPlatformDataTransferModels.InformationModels;


namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateAccountInfo
    {
        // voeg hier all properties toe die nodig zijn om een nieuwe account aan te maken.
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string ConfirmEmail { get; set; }
        public string RoleType { get; set; }
        public PersonInfo Person { get; set; }
        public bool IsTeacher { get; set; }
       

        //!!!!!!! propreties doorgeven met kleine letter beginnen via angular

    }
}
