using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Manim_Model.Entity;

public class Swd392Context : IdentityDbContext<ApplicationUser>
{
    public Swd392Context()
    {
    }

    public Swd392Context(DbContextOptions<Swd392Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Chapter> Chapters { get; set; }

    public virtual DbSet<Deposit> Deposits { get; set; }

    public virtual DbSet<ProblemType> ProblemTypes { get; set; }

    public virtual DbSet<Solution> Solutions { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    public virtual DbSet<Topic> Topics { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }
    //public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Wallet> Wallets { get; set; }
    private string? GetConnectionString()
    {
        IConfiguration configuration = new ConfigurationBuilder().SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../Manim-API")).AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();
        return configuration["ConnectionStrings:DefautDB"];
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer(GetConnectionString());
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            string tableName = entityType.GetTableName() ?? "";
            if (tableName.StartsWith("AspNet"))
            {
                entityType.SetTableName(tableName.Substring(6));
            }
        }
    }

    //partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
