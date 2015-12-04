using EvaluationPlatformDataTransferModels.InformationModels;


namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateAccountInfo
    {
        // voeg hier all properties toe die nogig zijn om een nieuwe account aan te maken.
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public string ConfirmEmail { get; set; }
        public string RoleType { get; set; }
        public PersonInfo Person { get; set; }
        public bool IsTeacher { get; set; }
        //... wat moet hier nog bij? moet hier niet gewoon een instancsie van de klasse AccountInfo en de klasse account info updaten met alle properties van het domainmodel account?
        //(of toch de properties die we nodig hebben.)

        //!!!!!!! propreties doorgeven met kleine letter beginnen via angular

    }
}
