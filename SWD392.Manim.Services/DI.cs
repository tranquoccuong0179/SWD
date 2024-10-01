using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.Repository.Implement;
using SWD392.Manim.Repositories.Repository.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Services.Mapper;
using System.Reflection;

namespace SWD392.Manim.Services
{
    public static class DI
    {
        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddRepository();
            services.AddAutoMapper();
            services.AddServices();
            services.SeedData();
            services.AddAutoMapper();
        }
        public static void AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork<Swd392Context>>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        }

        private static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(UserProfile).Assembly);
            services.AddAutoMapper(typeof(ChapterProfile).Assembly);
            services.AddAutoMapper(typeof(ProblemProfile).Assembly);
            services.AddAutoMapper(typeof(SolutionProfile).Assembly);
            services.AddAutoMapper(typeof(SubjectProfile).Assembly);
            services.AddAutoMapper(typeof(TopicProfile).Assembly);
            services.AddAutoMapper(typeof(ParameterProfile).Assembly);

        }
        public static void AddServices(this IServiceCollection services)
        {
            // Lấy assembly hiện tại
            Assembly assembly = Assembly.GetExecutingAssembly();
            // Tìm tất cả các loại có interface và đăng ký chúng
            List<ServicesType> serviceTypes = assembly.GetTypes().Where(t => t.IsClass && !t.IsAbstract).SelectMany(t => t.GetInterfaces(), (t, i) => new ServicesType { Implementation = t, Interface = i }).ToList();
            foreach (var service in serviceTypes)
            {
                // Đăng ký dịch vụ với scope phù hợp (Scoped, Transient, Singleton)
                services.AddScoped(service.Interface!, service.Implementation!);
            }
        }
        public static void SeedData(this IServiceCollection services)
        {
            using var scope = services.BuildServiceProvider().CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<Swd392Context>();
            var initialiser = new SeedData(context);
            initialiser.SeedingData();
        }
        public class ServicesType
        {
            public Type? Implementation { get; set; }
            public Type? Interface { get; set; }
        }
    }
}
