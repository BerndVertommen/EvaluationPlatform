﻿using System;
using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformDomain.Models
{
    public class Teacher : Entity
    {
        public virtual Person Person { get; protected set; }
        public virtual ICollection<Class> Classes { get; } = new List<Class>(); // c#6 auto initializers
        public virtual ICollection<Evaluation> Evaluations { get; } = new List<Evaluation>();
        public virtual ICollection<EvaluationTemplate> EvaluationTemplates  { get; } = new List<EvaluationTemplate>();
        public virtual ICollection<Course> Courses { get; } = new List<Course>();

       
       // public virtual ICollection<StudyPlan> StudyPlans { get; } = new List<StudyPlan>();

        public Teacher()
        {
            
        }

        public Teacher(Person person)
        {
            Person = person;
        }

        public void AddClass(Class toAddClass)
        {
            if (Classes.Any(c => c.Id == toAddClass.Id))
            {
                throw new Exception("Class already added.");
            }

            Classes.Add(toAddClass);
        }

        public void AddEvaluation(Evaluation evaluation)
        {
            Evaluations.Add(evaluation);
        }

        public void AddCourse(Course course)
        {
            if (Courses.Any(c => c.Id == course.Id))
            {
                throw new Exception("Course already on teacher");
            }
            Courses.Add(course);
        }

        //public void AddStudypPlan(StudyPlan studyPlan)
        //{
        //    StudyPlans.Add(studyPlan);
        //}

        public void AddEvaluationTemplate(EvaluationTemplate evaluationTemplate)
        {
            EvaluationTemplates.Add(evaluationTemplate);
        }

        public void AddNewEvaluations( string description, Class klas, EvaluationTemplate evaluationTemplate, DateTime evaluationDate, Course course)
        {
            Guid bundleId = Guid.NewGuid();
            foreach (var student in klas.Students)
            {
                List<EvaluationItem> evaluationItems = new List<EvaluationItem>();
                foreach (var subsection in evaluationTemplate.EvaluationSubSections)
                {
                    foreach (Goal goal in subsection.Goals)
                    {
                        evaluationItems.Add(new EvaluationItem(goal, subsection));
                    }
                }

                AddEvaluation(new Evaluation(description, evaluationTemplate, student, evaluationDate, course, evaluationItems, "", bundleId,klas));
            }

        }
    }
}
