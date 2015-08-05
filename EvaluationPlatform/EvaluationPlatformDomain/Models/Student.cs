﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class Student : Entity
    {
        public virtual Person Person { get; set; }

        public Student(Person person)
        {
            Person = person;
        }

        public Student()
        {
        }
    }
}
