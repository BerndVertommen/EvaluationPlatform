using System;
using Autofac;

namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
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
            var commandHandler = GetCommandHandler(command);
            commandHandler.Handle((dynamic)command);
            commandHandler.SaveChanges();
            }

        protected dynamic GetCommandHandler(ICommandObject command)
        {
            Type commandHandlerImplementationType = typeof(ICommandHandler<>).MakeGenericType(command.GetType());
            dynamic commandHandler = _lifetimeScope.Resolve(commandHandlerImplementationType);

            return commandHandler;
        }
    }
}
