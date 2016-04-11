using System;
using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CsvProcessing.Processors.Student;
using EvaluationPlatformLogic.CsvProcessing.ProcessResultDto;
using EvaluationPlatformLogic.CsvProcessing.RecordMappings.Student;

namespace EvaluationPlatformLogic.CsvProcessing.ResultHandlers.Student
{
    public class StudentWithClassResultHandler : BaseRecordResultHandler<StudentWithClassProcessResultDto, StudentWithClassCsvProcessor>
    {
        private readonly SchoolYear _schoolYear;

        public StudentWithClassResultHandler(IEPDatabase database, SchoolYear schoolYear) : base(database)
        {
            _schoolYear = schoolYear;
        }


        public override void Handle(IEnumerable<StudentWithClassProcessResultDto> processedRecords)
        {
            IEnumerable<ClassInfo> resultGroupedByClass = processedRecords.GroupBy(r => r.ClassCode,
               r => r.StudentInfo,
               (key, g) => new ClassInfo() { Description = key, Students = g.ToList() });

            var allClasses = HandleClasses(resultGroupedByClass);

           HandleStudents(resultGroupedByClass, allClasses);

        }

        private void HandleStudents(IEnumerable<ClassInfo> resultGroupedByClass, IEnumerable<Class> allClasses)
        {
           /* The class now present in the database is used to add students to them. */
            foreach (var classInfo in resultGroupedByClass)
            {
                Class realClass = allClasses.FirstOrDefault(al => al.Description.Equals( classInfo.Description, StringComparison.CurrentCultureIgnoreCase));
                foreach (var studentInfo in classInfo.Students)
                {
                    var student = Database.Students.FirstOrDefault(s =>
                        s.Person.FirstName.Equals(studentInfo.Person.FirstName,StringComparison.CurrentCultureIgnoreCase) &&
                        s.Person.LastName.Equals( studentInfo.Person.LastName,StringComparison.CurrentCultureIgnoreCase) &&
                                  (s.Person.BirthDate == studentInfo.Person.BirthDate));

                    if (student == null)
                    {
                        student = new EvaluationPlatformDomain.Models.Student(new Person(studentInfo.Person.FirstName, studentInfo.Person.LastName, studentInfo.Person.BirthDate));
                    }
                    
                    realClass.AddStudent(student);
                }
               
            }
        }


        private IEnumerable<Class> HandleClasses(IEnumerable<ClassInfo> resultGroupedByClass)
        {

            IEnumerable<Class> existingClasses = GetExistingClasses(resultGroupedByClass);
            IEnumerable<Class> newClasses = CreateNewClasses(existingClasses, resultGroupedByClass);

            IEnumerable<Class> allClasses = existingClasses.Concat(newClasses);

            return allClasses;
        }

        private IEnumerable<Class> CreateNewClasses(IEnumerable<Class> existingClasses, IEnumerable<ClassInfo> resultGroupedByClass)
        {
            IEnumerable<Class> newClasses = new List<Class>();
            IEnumerable<ClassInfo> newClassesToCreate;
            if (existingClasses.Any())
            {
                newClassesToCreate =
               resultGroupedByClass.Where(
                   r => existingClasses.All(ec => !ec.Description.Equals( r.Description, StringComparison.CurrentCultureIgnoreCase)));             
            }
            else
            {
                newClassesToCreate = resultGroupedByClass;
            }

            foreach (var classInfo in newClassesToCreate)
            {
                var newClass = new Class(classInfo.Description, _schoolYear, new List<EvaluationPlatformDomain.Models.Student>());

                Database.Classes.Add(newClass);
            }

            if (newClassesToCreate.Any())
            {
                Database.SaveChanges();
            }
            return newClasses;
        }

        private IEnumerable<Class> GetExistingClasses(IEnumerable<ClassInfo> resultGroupedByClass)
        {
            List<Class> existingclasses = new List<Class>();

            foreach (var classInfo in resultGroupedByClass)
            {
              var klas =
                    Database.Classes.FirstOrDefault(
                    c => classInfo.Description.Equals(c.Description, StringComparison.CurrentCultureIgnoreCase) &&
                    c.SchoolYear.Id == _schoolYear.Id);

                if (klas != null)
                {
                    existingclasses.Add(klas);
                }
            }
              
            return existingclasses; 
        }
    }
}
