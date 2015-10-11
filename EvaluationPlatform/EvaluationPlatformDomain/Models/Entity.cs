using System;

namespace EvaluationPlatformDomain.Models
{
    public abstract class Entity
    {
        public Guid Id { get; private set; }
        public string Discription { get; set; }

        public Entity()
        {
            Id = Guid.NewGuid();
        }

        public Entity(string discription):this()
        {
            Discription = discription;
        }
    }
}
