using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformDAL.Generators
{
    public class GeneralGoalsGenerator
    {
        public void AddVerzorginGoalsToStudyPlan(StudyPlan studyPlan)
        {
            for (int i = 1; i < 12; i++)
            {
                studyPlan.AddGeneralGoal(new GeneralGoal(i, "Leerplandoel " + i, GetgoalsforGeneralGoal(i)));
            }
        }


        private IEnumerable<Goal> GetgoalsforGeneralGoal(int goalnr)
        {

            string goals = "";

            switch (goalnr)
            {
                case 1:
                    goals =
                         @"De leerling kan de werkpost zelfstandig  installeren.
                        £ De leerling kan de werkpost onder begeleiding installeren.		
                        £ De leerling kan het basismateriaal dat op de werkpost dient te liggen benoemen.
                        £ De leerling kan het basismateriaal dat op de werkpost  in volgorde van gebruik leggen.  		
                        £ De leerling kan het materiaal tijdens het werk ordelijk op de werkpost houden.
                        £ De leerling heeft oog voor netheid en hygiëne en maakt het materiaal steeds zuiver. 		
                        £ De leerling kan de klant zelfstandig installeren.
                        £ De leerling kan de klant onder begeleiding installeren .		
                        £ De leerling kan het borstelen op lange haren zelfstandig uitvoeren. 		
                        £ De leerling kan het borstelen op lange haren onder begeleiding uitvoeren.
                        £ De leerling kan het borstelen van korte haren zelfstandig uitvoeren. 		
                        £ De leerling kan het borstelen van korte haren onder begeleiding uitvoeren
                        £ De leerling kan het doel van het borstelen van de haren  verwoorden.
                        £ De leerling kan het voorbereidend werk +borstelen haren correct en efficiënt  uitvoeren.";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "borstelen");
                    }

                    break;
                case 3:
                    goals =
                        @"
                        De leerlingen kunnen, het verschil tussen de eerste en tweede wasbeurt formuleren. 		
                        £ De leerlingen kunnen het verschil in wastechniek tussen de eerste en tweede wasbeurt formuleren. 		
                        £ De leerlingen kunnen de handen in de juiste stand plaatsen afhankelijk van de eerste of tweede wasbeurt. 		
                        £ De leerlingen kunnen het doel van de verschillende wasbeurten 		
                        £ De leerlingen kunnen het wassen van de haren zelfstandig kunnen uitvoeren:		
                        £ De leerlingen kunnen het wassen van de haren onder begeleiding uitvoeren. 		
                        £ De leerlingen kunnen de techniek van de eerste wasbeurt onder begeleiding uitvoeren op een kaal oefenhoofd		
                        £ De leerlingen kunnen de techniek van de eerste wasbeurt onder begeleiding uitvoeren op  model. 		
                        £ De leerlingen kunnen de techniek van de tweede wasbeurt onder begeleiding uitvoeren op een kaal oefenhoofd		
                        £ De leerlingen kunnen de techniek van de tweede wasbeurt onder begeleiding uitvoeren op een model		
                        £ De leerlingen kunnen de haren voldoende en correct bevochtigen. 		
                        £ De leerlingen kunnen de haren voldoende en correct uitspoelen na het wassen.   		
                        £ De leerlingen kunne de haren correct uitknijpen en afdrogen na het wassen. 		
                        £ De leerlingen kunnen de haren voorbereiden en voldoende droog maken voor het aanbrengen van een balsem. 		
                        £ De leerlingen kunnen de balsem op een juiste manier verdelen in lengten en punten. 		
                        £ De leerlingen kunnen met een juiste techniek en de ontwarkam de haren ontwarren aan de wastafel		
                        £ De leerlingen kunnen de balsem correct en voldoende uitspoelen na de inwerktijd. 		
                        £ De leerling kan de natte haren correct en met het juiste materiaal ontwarren. 		
                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "wassen");
                    }

                    break;
                case 4:
                    goals =
                        @"
                        De leerlingen kunnen de kritieke punten bij de oprolling verwoorden.		
                        £ De leerlingen kunnen het kapsel onder begeleiding tot een goed resultaat brengen. ( minstens tot kruin)		
                        £ De leerlingen kunnen de opbouw van het kapsel correct verwoorden. 		
                        £ De leerlingen kunnen het kapsel correct opbouwen. 		
                        £ De ll. hebben kennis van de verschillende soorten verstevigers en kennen de toepassing ervan.		
                        £ De ll. hebben kennis van de verschillende soorten verstevigers en kennen de toepassing ervan.		
                        £ De leerling kan de afdeling zijpartijen zelfstandig en vlot  maken		
                        £ De leerling kan oprolling zijpartijen zelfstandig maken 		
                        £ De leerling kan zelfstandig de oprolling baksteenvorm maken:		
                        £ De leerling kan zuivere en correcte verdeling maken		
                        £ De leerling kan een zuivere oprolling maken. 		
                        £ De leerling houdt er rekening mee dat de haarpunten glad rond de haarrol dienen te liggen en voert dit correct uit.		
                        £ Je kan een afdeling maken op basis van een haarrol op het toupet. 		
                        £ Je kan 10 verdelingen maken op het toupet die aangepast zijn aan de dikten en lengte van de haarrol. 		
                        £ Je kan een oprolling van 10 haarrollen uitvoeren in 90° en onder begeleiding. 		
                        £ Je kan de oprolling van 10 haarrollen zelfstandig uitvoeren in 90°. 		
                        £ Je kan de verschillende soorten haarrollen benoemen. 		
                        £ Je kant de extra benodigdheden bij het oprollen met verschillende soorten haarrollen en je kan ze benoemen. 		
                        £ Je kan een zelfevaluatie doen bij het oprollen met verschillende soorten haarrollen. 		
                        £ Je kan door het werken met verschillende soorten haarrollen ervaren welke professionele zijn en welke niet. 		
                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "oprollen");
                    }

                    break;
                case 5:
                    goals =
                        @"
                        De ll. hebben kennis van de verschillende soorten verstevigers en kennen de toepassing ervan.		
                        £De ll. kunnen een gebruiksaanwijzing lezen en begrijpen.		
                        £De brushing met horizontale verdelingen binnenwaarts zelfstandig kunnen uitvoeren.		
                        £Voorbereidend werkcorrect en zelfstandig kunnen uitvoeren:		
                        £Weten dat professionele shampoos meestal samengaan met een professionele gebruiksaanwijzing en toepassing.		
                        £Je kan een schuimversteviger op een correcte manier toepassen. 		
                        £Je kan een schuimversteviger op een correcte manier  en op het juiste moment toepassen. 		
                        £Je kent de veiligheidsmatregelen bij het werken met haarlak. 		
                        £Je kan haarlak aanbrengen op een correct afstand en rekening houdend met de veiligheidsvoorschriften. 		
                        £Je kan een gel aanbrengen in een kapsel. 		
                        £Je kan verwoorden wanneer je een gel kan gebruiken in een kapsel. 		
                        £Je kan verwoorden waar je moet opletten bij het gebruik van kleurgel, glittergel en kleurlak. 		
                        £Je kan kleurgel, glittergel en kleurlak op een correcte manier aanbrengen en rekening houden met de bescherming van klant en meubilair. 		
                        £Je kan zelfstandig aan de slag met een stappenplan. 		
                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "producten");
                    }

                    break;
                case 6:
                    goals =
                        @"
                        De leerling kent de veiligheidsmatregelen bij het gebruik van de handhaardroger		
                        £ De leerlingen houdt rekening met de veiligheidsmaatregelen bij het gebruik van de handhaardroger. 		
                        £ De leerling kan de delen van de handhaardroger benoemen en correct gebruiken.		
                        £  De leerling kan de verdelingen zigzag en horizontaal maken. 		
                        £  De leerling kan de borstel en handhaardroger in de juiste stand gebruiken		
                        £  De leerling kan het juiste volume geven aan de haarwortel. 		
                        £ De leerling kan de techniek van de binnenwaartse brushing onder begeleiding uitvoeren. 		
                        £  De leerling kan de lok glad brushen met de juiste glans. 		
                        £ De leerling kan de techniek van de binnenwaartse brushing zelfstandig uitvoeren. 		
                        £ De leerling kan de techniek van de buitenwaartse brushing onder begeleiding uitvoeren. 		
                        £   De leerling kan de techniek van de buitenwaartse brushing zelfstandig uitvoeren. 		
                        £ De brushing met horizontale verdelingen buitenwaarts correct en zelfstandig  kunnen uitvoeren.		
                        £ De leerling kan het gebrushte kapsel met de juiste producten en op de juiste manier kunnen afwerken		
                        £ Je kan zelfstandig aan de slag met een stappenplan. 		
                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "drogen");
                    }

                    break;
                case 7:
                    goals =
                        @"
                        Je kan afdeling 1 op het toupet maken en maakt hierbij gebruik van het juiste materiaal. 		
                        £ Je kan correcte verdelingen maken aangepast aan de dikte van de wikkel. 		
                        £ Je kan je lok glad kammen en in de juiste stand t.o.v. het hoofd houden. 		
                        £ Je kan het puntpapiertje op een juiste manier plaatsen. 		
                        £ Je kan de wikkeling zuiver maken en met de juiste spanning. 		
                        £ Je kan de vasthechting correct doen en de elastiek en het permanentlatje gebruiken. 		
                        £ Je wikkels staan volledig tegen elkaar en horizontaal t.o.v. van het vak. 		
                        £ De oprolling is glad en zuiver rond de wikkel. 		
                        £ Je plaatst de elastiek zodanig dat deze de hoofdhuid niet raakt. 		
                        £ Je kan verwoorden waarom het uiterst belangrijk is dat de elastiek de hoofdhuid niet raakt. 		
                        £ Je weet wat een permanentvloeistof doet.		
                        £ Je weet wat een neutralisatievloeistof doet.		
                        £ Je kent de veiligheidsvoorschriften bij het werken met chemische producten. 		
                        £ Je hebt een idee van de verschillende stappen die te volgen zijn bij het plaatsen van een permanent. 		
                        £ Je kent de verschillende materialen die we bij permanenten gebruiken en je kan ze benoemen. 		
                        £ Je plaatst alles ordelijk op je werkplaats. 		
                        £ Je zet je kapstoel steeds op zijn plaats bij het verplaatsen van het model. 		

                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis);
                    }

                    break;
                case 8:
                    goals =
                        @"
                        Je kan een verzorgend bad ( haarmasker ) toepassen met penseel.		
                        £ Je kan een klantenfiche met behandelingsplan invullen. 		
                        £ Je kan de  klantenfiche onder begeleiding kunnen invullen,		
                        £ Je kan de  kruisverdeling zelfstandig maken. 		
                        £ Je kan correcte onderverdelingen maken bij het toepassen van het haarmasker. 		
                        £ Je kan een haarmasker correct en zelfstandig toepassen. 		
                        £ Je kan een haarmasker correct  onder begeleiding  toepassen. 		
                        £ Je kan het uitspoelen van het haarmasker correct uitvoeren. 		
                        £ Je kan een verzorgend bad toepassen met penseel.		
                        £ Je weet dat natuurlijke bestanddelen een aangenaam, minder prijzig en toch goed resultaat kunnen geven.		
                        £ Je kan de bereiding van een natuurlijk haarmasker onder begeleiding uitvoeren. 		
                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "maskers");
                    }

                    break;
                case 9:
                    goals =
                        @"
                        Je kan de haren correct ontwarren met een ontwarborstel. 		
                        £ Je kan de elastiekjestechniek correct uitvoeren bij het maken van een staart. 		
                        £ Je weet welke materialen je dient te gebruiken bij de elastiekjestechniek. 		
                        £ Je kan een hoge staart zuiver en op de juiste plaats op het hoofd vastzetten. 		
                        £ Je kan de techniek van het twisten met twee strengen onder begeleiding uitvoeren. 		
                        £ Je kan de techniek van het twisten met twee strengen zelfstandig uitvoeren. 		
                        £ Je kan de twist correct vasthechten en met het juiste materiaal. 		
                        £ Je kan de twist zuiver en voldoende vast opdraaien. 		
                        £ Je kan de twisten verwerken met een hoge staart met het principe van de windrichtingen. 		
                        £ Je kan de techniek van de tweevlecht uitvoeren met koorden. 		
                        £ Je kan de techniek van de tweevlecht in een staart uitvoeren onder begeleiding. 		
                        £ Je kan de techniek van de tweevlecht in een staart zelfstandig uitvoeren.  		
                        £ Je gebruikt de juiste spanning bij het maken van de tweevlecht. 		
                        £ Je kan de lokken zuiver afdelen en verwerken. Bij de tweevlecht. 		
                        £ Je kan de techniek van de ingewerkte tweevlecht uitvoeren met koorden. 		
                        £ Je kan de techniek van de ingewerkte tweevlecht uitvoeren  met koorden en onder begeleiding. 		
                        £ Je kan de techniek van de ingewerkte tweevlecht  uitvoeren op een oefenhoofd en onder begeleiding. 		
                        £ Je kan de techniek van de ingewerkte tweevlecht zelfstandig uitvoeren op oefenhoofd. 		
                        £ Je kan de afgedeelde lokken bij de ingewerkte drievlecht zuiver afdelen. 		
                        £ Je kan de spanning van de lokken bij de ingewerkte drievlecht gelijk houden. 		
                        £ Je kan de handen bij het maken van de ingewerkte tweevlecht tegen de hoofdhuid houden. 		
                        £ Je kan de positie van het oefenhoofd wijzigen tijdens het verwerken van de ingewerkte tweevlecht. 		

                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "vlechten");
                    }

                    break;

                case 10:
                    goals =
                        @"
                       Je vindt orde en netheid tijdens het werk belangrijk en laat dit dan ook zien aan je werkpost en je materiaal. .		
                       £ Je kan correct omgaan met je medeleerlingen. 		
                       £ De leerlingen kunnen zich een beeld vormen van het vak en het kapsalon.		
                       £ Je weet dat sociaal zijn uiterst belangrijk is in een beroep als kapper. 		
                       £ Je ziet de noodzaak in van het onderhouden van het materiaal.		
                       £ Je ziet het nut in van creativiteit en doorzettingsvermogen in het kappersvak. 		
                       £  Je kan materiaal op een verantwoorde manier reinigen en onderhouden.		
                       £ Je praat correct Nederlands. 		
                       £ Je neemt je taak van het onderhoud van het kapsalon ernstig en voert deze dan ook steeds uit. 		
                       £ Je neemt verantwoordelijkheid en bent steeds in orde met je materialen en benodigdheden. 		
                       £ Je neemt verantwoordelijkheid en bent steeds in orde met je taken en lessen. 		
                       £ Je neemt verantwoordelijkheid en je zoekt oplossingen via smartschool om lesmateriaal en studeiwijzers te bekijken. 		
                       £ Je neemt verantwoordelijkheid en je plant samen met de lk in te halen toetsen. 		
                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "orde");
                    }

                    break;

                case 11:
                    goals =
                        @"
                       Je kent de opeenvolgende bewerkingen bij het uitvoeren van een  nagel en handverzorging. 		
                       £ Je kan de kniptechniek van de nagels verwoorden. 		
                       £ Je kan de kniptechniek van de nagels correct en onder begeleiding uitvoeren. 		
                       £ Je kan de kniptechniek van de nagels correct en zelfstandig uitvoeren. 		
                       £ Je kent verschillende soorten nagelvijlen en je kan ze benoemen. 		
                       £ Je kan de techniek van het vijlen van de nagels verwoorden. 		
                       £ Je kan de techniek van het vijlen van de nagels uitvoeren onder begeleiding.  		
                       £ Je kan de techniek van het vijlen van de nagels zelfstandig uitvoeren. 		
                       £ Je kan verwoorden waarom je de nagels moet weken. 		
                       £ Je weet welke producten je kan gebruiken bij het maken van het handbad. 		
                       £ Je kan het doel van het handbadje verwoorden. 		
                       £ Je kent de verschillende materialen die je kan gebruiken voor het achteruitduwen van de nagelriemen en je kan ze benoemen. 		
                       £ Je kan de techniek van het achteruitduwen van de nagelriemen verwoorden. 		
                       £ Je kan de techniek van het achteruitduwen van de nagelriemen onder begeleiding uitvoeren. . 		
                       £ Je kan de techniek van het achteruitduwen van de nagelriemen zelfstandig uitvoeren. 		
                       £ Je kan controleren of de nagelriemen voldoende zijn achteruitgeduwd en jezelf bijsturen. 		
                       £ Je kent het materiaal voor het reinigen van de vrije boord en je kan het benoemen. 		
                       £ Je kan het reinigen van de vrije boord uitvoeren onder begeleiding. 		
                       £ Je kan het reinigen van de vrije boord zelfstandig uitvoeren. 		
                       £ Je kan de KP bij het reinigen van de vrije boord benoemen. 		
                       £ Je kan het materiaal voor het knippen van velletjes benoemen. 		
                       £ Je kent de veiligheidsmaatregelen en voorschriften bij het knippen van velletjes. 		
                       £ Je kan het materiaal voor het knippen van velletjes correct hanteren. . 		
                       £ Je kan het knippen van velletjes uitvoeren onder begeleiding. 		
                       £ Je kan het knippen van velletjes zelfstandig  uitvoeren. 		
                       £ Je kan de techniek van het lakken van de nagels verwoorden. 		
                       £ Je kent het verschil tussen basislak, kleurlak en toplak. 		
                       £ Je kan de verschillende lakken herkennen en benoemen door het lezen van de toepassing. 		
                       £ Je kan de basislaag correct toepassen en in drie stappen uitvoeren onder begeleiding., 		
                       £ Je kan de basislaag correct toepassen  en in drie stappen zelfstandig  uitvoeren.  		
                       £ Je kan de eerste kleurlaklaag correct toepassen in vier stappen en onder begeleiding. 		
                       £ Je kan de eerste kleurlaklaag correct en zelfstandig toepassen in vier stappen en onder begeleiding. 		
                       £ Je kan de tweede kleurlaklaag correct toepassen in drie stappen en onder begeleiding. 		
                       £ Je kan de tweede kleurlaklaag correct  en zelfstandig  toepassen in drie stappen .  		
                       £ Je kan een juiste keuze maken bij de aankoop van nagellakontbinder. 		
                       £ Je begrijpt dat nagellakontbinder een oplosmiddel is en tijd nodig heeft om in te werken. 		
                       £ Je weet dat de aanwezigheid van aceton in nagellakontbinder schadelijk is voor de gezondheid. 		
                       £ Je kan de nagellak op een correcte manier verwijderen. 		

                        ";

                    foreach (var dis in goals.Split('£'))
                    {
                        yield return new Goal(dis, "nagels");
                    }

                    break;

                default:
                    yield return new Goal("No discription");
                    break;
            }
        }
    }
}
