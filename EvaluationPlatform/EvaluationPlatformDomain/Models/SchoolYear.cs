using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDomain.Models.BaseEntities;

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

        public static int GetStartYearThisSchoolYear()
        {
            var now = DateTime.Now;
            // When before August return the previous year as startyear after August return the current year as startyear
            return now.Month < 8 ? now.AddYears(-1).Year : now.Year;
        }
    }
}
