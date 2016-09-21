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

        public void Execute(ICommandDto command)
        {
            var commandHandler = GetCommandHandler(command);
            commandHandler.Handle((dynamic)command);
            commandHandler.SaveChanges();
            }

        public TResult Execute<TResult>(ICommandDto<TResult> commandDto)
        {
            var commandHandler = GetCommandHandler(commandDto);
            var returnValue = commandHandler.Handle((dynamic)commandDto);
            commandHandler.SaveChanges();

            return returnValue;
        }
    
        protected dynamic GetCommandHandler(ICommandDto command)
        {
            Type commandHandlerImplementationType = typeof(ICommandHandler<>).MakeGenericType(command.GetType());
            dynamic commandHandler = _lifetimeScope.Resolve(commandHandlerImplementationType);

            return commandHandler;
        }

        protected dynamic GetCommandHandler<TResult>(ICommandDto<TResult> command)
        {
            Type commandHandlerImplementationType = typeof(ICommandHandler<,>).MakeGenericType(command.GetType(), typeof(TResult));
            dynamic commandHandler = _lifetimeScope.Resolve(commandHandlerImplementationType);

            return commandHandler;
        }
    }
}
