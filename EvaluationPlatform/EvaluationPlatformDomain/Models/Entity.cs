﻿using System;

namespace EvaluationPlatformDomain.Models
{
    public abstract class Entity
    {
        public Guid Id { get; private set; }

        public Entity()
        {
            Id = Guid.NewGuid();
        }
    }
}
