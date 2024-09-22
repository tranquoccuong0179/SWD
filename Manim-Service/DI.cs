﻿using Manim_Model.Entity;
using Manim_Repository.Repository.Implement;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service
{
    public static class DI
    {
        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddRepository();
            services.AddAutoMapper();
            services.AddServices();
        }
        public static void AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork<Swd392Context>>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        }

        private static void AddAutoMapper(this IServiceCollection services)
        {
            //services.AddAutoMapper(Assembly.GetExecutingAssembly());
        }
        public static void AddServices(this IServiceCollection services)
        {
            // Lấy assembly hiện tại
            Assembly assembly = Assembly.GetExecutingAssembly();
            // Tìm tất cả các loại có interface và đăng ký chúng
            List<ServicesType> serviceTypes = assembly.GetTypes().Where(t => t.IsClass && !t.IsAbstract).SelectMany(t => t.GetInterfaces(), (t, i) => new ServicesType { Implementation  = t, Interface = i }).ToList();
            foreach (var service in serviceTypes)
            {
                // Đăng ký dịch vụ với scope phù hợp (Scoped, Transient, Singleton)
                services.AddScoped(service.Interface!, service.Implementation!);
            }
        }
        public class ServicesType
        {
            public Type? Implementation { get; set; }
            public Type? Interface { get; set; }
        }
    }
}