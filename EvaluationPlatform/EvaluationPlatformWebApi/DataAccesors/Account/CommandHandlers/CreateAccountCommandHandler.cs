using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Account.Commands;

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

           
        }
    }
}