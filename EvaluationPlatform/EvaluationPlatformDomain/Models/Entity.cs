using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SqlServer.Server;

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
