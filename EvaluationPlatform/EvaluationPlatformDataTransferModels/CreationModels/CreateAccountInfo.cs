using EvaluationPlatformDataTransferModels.InformationModels;


namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateAccountInfo
    {
        // voeg hier all properties toe die nogig zijn om een nieuwe account aan te maken.

        public PersonInfo Person { get; set; }
        //... wat moet hier nog bij? moet hier niet gewoon een instancsie van de klasse AccountInfo en de klasse account info updaten met alle properties van het domainmodel account?
        //(of toch de properties die we nodig hebben.)


    }
}
