using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Course.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Course.QueryHandlers
{
    public class CoursesForTeacherQueryHandler : QueryHandler<CoursesForTeacherQueryObject, IEnumerable<CourseViewInfo>>
    {
        public CoursesForTeacherQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<CourseViewInfo> Handle(CoursesForTeacherQueryObject queryObject)
        {
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == queryObject.TeacherId);

            if (teacher == null)
            {
                throw new NullReferenceException("Teacher not found");
            }
            var cources = teacher.Courses;


            var courcesViewInfo = Mapper.Map<IEnumerable<CourseViewInfo>>(cources).ToList();


            foreach (CourseViewInfo courseInfo in courcesViewInfo)
            {
                var teachers = Database.Teachers.Where(t => t.Courses.Any(c => c.Id == courseInfo.Id)).ToList();

                courseInfo.CoTeachers = Mapper.Map<IEnumerable<TeacherBaseInfo>>(teachers);
            }


            return courcesViewInfo;
        }
    }
}