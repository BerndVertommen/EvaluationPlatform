using System;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.Account.Commands;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.Exeptions;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.CommandHandlers
{
    public class CreateAccountCommandHandler : CommandHandler<CreateAccountCommand>
    {
        public CreateAccountCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateAccountCommand commandObject)
        {
            var account = Database.Accounts.FirstOrDefault(a => a.Username == commandObject.CreateAccountInfo.Username);
            if (account != null)
            {
                throw new BusinessExeption(BusinessExeption.UsernameExists);
            }

            var createAccountInfo = commandObject.CreateAccountInfo;
            // gebruik de createAccountInfo om een nieuwe account aan te maken
            // stop de nieuwe account nadien in de database. Id moet je niet invullen dit doet de basisklasse 'entity'

            // string omzetten naar roltype
            AccountRoleType roletype = (AccountRoleType)Enum.Parse(typeof(AccountRoleType), createAccountInfo.RoleType, true);

            // rol uit de databank ophalen nooit nieuwe rol aanmaken
            AccountRole role = Database.AccountRoles.FirstOrDefault(a => a.AccountRoleType == roletype);

            // nieuwe account aanmaken
            EvaluationPlatformDomain.Models.Account.Account newAccount =
                EvaluationPlatformDomain.Models.Account.Account.CreateAccount(createAccountInfo.Username,
                    createAccountInfo.Email,
                   createAccountInfo.Person.FirstName,
                        createAccountInfo.Person.LastName, createAccountInfo.Person.BirthDate, role, createAccountInfo.Password,
                    createAccountInfo.ConfirmPassword, createAccountInfo.ConfirmEmail);

            // teacher aanmaken en in database steken
            if (createAccountInfo.IsTeacher)
            {
                EvaluationPlatformDomain.Models.Teacher newTeacher = new EvaluationPlatformDomain.Models.Teacher(newAccount.Person);
                Database.Teachers.Add(newTeacher);
            }

            // in database steken
            Database.Accounts.Add(newAccount);
        }
    }
}