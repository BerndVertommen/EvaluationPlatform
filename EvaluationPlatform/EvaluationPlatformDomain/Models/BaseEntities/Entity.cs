﻿using System;

namespace EvaluationPlatformDomain.Models.BaseEntities
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
