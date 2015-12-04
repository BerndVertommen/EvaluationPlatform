using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Account.Commands;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Account.CommandHandlers
{
    public class CreateAccountCommandHandler : CommandHandler<CreateAccountCommand>
    {
        public CreateAccountCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateAccountCommand commandObject)
        {
            var createAccountInfo = commandObject.CreateAccountInfo;
            // gebruik de createAccountInfo om een nieuwe account aan te maken
            // stop de nieuwe account nadien in de database. Id moet je niet invullen dit doet de basisklasse 'entity'

            // string omzetten naar roltype
            AccountRoleType roletype = (AccountRoleType)Enum.Parse(typeof(AccountRoleType), createAccountInfo.RoleType, true);
            
            // rol uit de databank ophalen nooit nieuwe rol aanmaken
            AccountRole role = Database.AccountRoles.FirstOrDefault(a => a.AccountRoleType == roletype);

            // nieuwe account aanmaken
            EvaluationPlatformDomain.Models.Account.Account newAccount = new EvaluationPlatformDomain.Models.Account.Account(createAccountInfo.Username,createAccountInfo.Email, new EvaluationPlatformDomain.Models.Person(createAccountInfo.Person.FirstName,createAccountInfo.Person.LastName,createAccountInfo.Person.BirthDate),role);

            // passwoord aanmaken
            newAccount.SetPassword(createAccountInfo.Password);

            // teacher aanmaken en in database steken
            if(createAccountInfo.IsTeacher)
            {
                Teacher newTeacher = new Teacher(newAccount.Person);
                Database.Teachers.Add(newTeacher);
            }

            // in database steken
            Database.Accounts.Add(newAccount);
           
        }
    }
}