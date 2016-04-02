using System;
using System.Linq;
using System.Reflection;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.App_Start
{
    public class MappingConfigurations
    {
        private static readonly string[] DtoSuffixes = { "Info", "SummaryInfo", "Message", "Dto", "ViewInfo","BaseInfo" };

        public static void Configure(Assembly sourceAssembly, Assembly destinationAssembly, string[] domainNamespaces)
        {
            ConfigureOnSuffix(sourceAssembly, destinationAssembly, domainNamespaces);
            // Class Mappings
            Mapper.CreateMap<Teacher, PrimaryTeacherInfo>();
            Mapper.CreateMap<Course, CourseInfo>()
                .ForMember(dest => dest.GoalsForCourse, // fills in GeneralGoalNumber on the goalinfo
                    opts =>
                        opts.MapFrom(
                            src =>
                                src.StudyPlan.GeneralGoals.SelectMany(
                                    gg =>
                                        gg.Goals.Select(
                                            g =>
                                                new GoalInfo()
                                                {
                                                    Description = g.Description,
                                                    GeneralGoalNumber = gg.GoalNumber,
                                                    Groupname = g.Groupname,
                                                    Id = g.Id
                                                }))));
        }

        private static void ConfigureOnSuffix(Assembly sourceAssembly, Assembly destinationAssembly, string[] domainNamespaces)
        {
            var sourceTypes = sourceAssembly.GetTypes();
            var destinationTypes = destinationAssembly.GetTypes();

            var representationDestinationTypes = destinationTypes.Where(t => DtoSuffixes.Any(s => t.Name.EndsWith(s)));
            var representationSourceTypes = sourceTypes.Where(t => IsDomainType(t, domainNamespaces)).ToArray();

            foreach (var destinationType in representationDestinationTypes)
            {
                var sourceType = representationSourceTypes.FirstOrDefault(dt => DtoSuffixes.Any(s => dt.Name.Equals(destinationType.Name.Replace(s, ""))));

                if (sourceType != null) Mapper.CreateMap(sourceType, destinationType);
            }
        }

        private static bool IsDomainType(Type t, string[] domainNamespaces)
        {
            return t.Namespace != null && domainNamespaces.Any(dns => t.Namespace.StartsWith(dns));
        }


    }
}
