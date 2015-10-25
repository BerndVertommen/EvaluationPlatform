using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Autofac;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public class CommandProcessor : ICommandProcessor
    {
        private readonly ILifetimeScope _lifetimeScope;

        public CommandProcessor(ILifetimeScope lifetimeScope)
        {
            _lifetimeScope = lifetimeScope;
        }

        public void Execute(ICommandObject command)
        {
            GetCommandHandler(command).Handle((dynamic)command);
        }

        protected dynamic GetCommandHandler(ICommandObject command)
        {
            Type commandHandlerImplementationType = typeof(ICommandHandler<>).MakeGenericType(command.GetType());
            dynamic commandHandler = _lifetimeScope.Resolve(commandHandlerImplementationType);

            return commandHandler;
        }
    }
}
