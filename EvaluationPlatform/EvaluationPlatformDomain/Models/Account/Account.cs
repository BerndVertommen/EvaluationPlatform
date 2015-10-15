﻿using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using EvaluationPlatformDomain.Models.Authentication;
using Infrastructure.Security;

namespace EvaluationPlatformDomain.Models.Account
{
    public class Account :  Entity, IAccount
    {
        public Account()
        {
            
        }
        public Account(string username, string email, Person person, AccountRole accountRole)
        {
            Username = username;
            Email = email;
            Person = person;
            AccountRoles.Add(accountRole);
        }

        public virtual string Username { get; protected set; }
        public virtual ICollection<AccountRole> AccountRoles { get; } = new List<AccountRole>();
        public virtual bool EmailConfirmed { get; protected set; }
        public virtual DateTime? RegistrationDate { get; protected set; }
        public virtual string Email { get; protected set; }
        public virtual string HashedPassword { get; protected set; }
        public virtual Person Person { get; protected set; }

        public virtual string Salt { get; protected set; }

        public void SetPassword(string newPassword)
        {
            string salt;
            HashedPassword = HashHandler.Hash(newPassword, out salt);
            Salt = salt;
        }

        public void ResetPassword(string newPassword,string oldPassword)
        {
            if (!VerifyPassword(oldPassword))
            {
                throw new Exception();
            }
            SetPassword(newPassword);
        }

        public virtual bool VerifyPassword(string password)
        {
            var result = HashHandler.Hash(password, Salt) == HashedPassword;

            return result;
        }
    }

    public interface IAccount
    {
        string Username { get;  }
        ICollection<AccountRole> AccountRoles { get; }
        bool EmailConfirmed { get;  }
        DateTime? RegistrationDate { get;  }
        [EmailAddress]
        string Email { get;  }
        string HashedPassword { get;  }
       
    }
}