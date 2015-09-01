﻿using System.Data.Entity;
using EvaluationPlatformDomain.Models;
using Infrastructure;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EvaluationPlatformDAL
{
    public class EPDatabase : DbContext, IEPDatabase
    {
        public IDbSet<Account> Accounts { get; set; } 
        // Project
        public IDbSet<Class> Classes { get; set; }
        public IDbSet<SchoolYear> SchoolYears { get; set; }
        public IDbSet<Student> Students { get; set; }
        public IDbSet<Teacher> Teachers { get; set; }
        public IDbSet<Cource> Cources { get; set; }
        public IDbSet<Evaluation> Evaluations { get; set; }
        public IDbSet<StudyPlan> StudyPlans { get; set; }
        public IDbSet<GeneralGoal> GeneralGoals { get; set; }
        public IDbSet<Goal> Goals { get; set; }

        public EPDatabase()
        {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
            Configuration.AutoDetectChangesEnabled = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudyPlan>().HasMany(c => c.Teachers).WithMany(p => p.StudyPlans);
            modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
        }
    }
}
