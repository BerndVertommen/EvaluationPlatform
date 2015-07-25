using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class SchoolYear: Entity
    {
        [Range(typeof(int),"2000","3000")]
        public virtual int StartYear { get; set; }

        [Range(typeof(int), "2000", "3000")]
        public virtual int EndYear { get; set; }


        public SchoolYear(int startYear, int endYear)
        {
            StartYear = startYear;
            EndYear = endYear;
        }

        /// <summary>
        /// Sets new schoolyear staring at the current year
        /// </summary>
        
        public SchoolYear()
        {
            StartYear = DateTime.Now.Year;
            EndYear = StartYear + 1;
        }
    }
}
