using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;

namespace EvaluationPlatformWebApi.Models
{
    public class AccountRole : IRole
    {
        public string Id { get; }
        public string Name { get; set; }
    }
}