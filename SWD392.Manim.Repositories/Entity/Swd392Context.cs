using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace SWD392.Manim.Repositories.Entity;

public class Swd392Context : IdentityDbContext<ApplicationUser, ApplicationRole, Guid, ApplicationUserClaims, ApplicationUserRoles, ApplicationUserLogins, ApplicationRoleClaims, ApplicationUserTokens>
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
    public virtual DbSet<Problem> Problems { get; set; }
    public virtual DbSet<Solution> Solutions { get; set; }
    public virtual DbSet<Subject> Subjects { get; set; }
    public virtual DbSet<Topic> Topics { get; set; }
    public virtual DbSet<Transaction> Transactions { get; set; }
    public virtual DbSet<Wallet> Wallets { get; set; }

    private string? GetConnectionString()
    {
        IConfiguration configuration = new ConfigurationBuilder().SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../SWD392.Manim.API")).AddJsonFile("appsettings.json", optional: false, reloadOnChange: true).Build();
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
        modelBuilder.Entity<SolutionParameter>(entity =>
        {
            entity.HasKey(sp => new { sp.ParameterId, sp.SolutionTypeId });
        });
        modelBuilder.Entity<ApplicationUser>()
            .HasOne(a => a.Wallet)
            .WithOne(w => w.User)
            .HasForeignKey<Wallet>(w => w.UserId);

        modelBuilder.Entity<Solution>()
            .HasOne(a => a.User)
            .WithMany(w => w.Solutions)
            .HasForeignKey(w => w.UserId);

        modelBuilder.Entity<Solution>().ToTable("Solutions");
        modelBuilder.Entity<SolutionOutput>().ToTable("SolutionOutputs");
        modelBuilder.Entity<Parameter>().ToTable("Parameters");
        modelBuilder.Entity<SolutionType>().ToTable("SolutionTypes");
        modelBuilder.Entity<SolutionParameter>().ToTable("SolutionParameters");

        modelBuilder.Entity<SolutionType>()
            .HasOne(s => s.Solution)
            .WithOne(so => so.SolutionType)
            .HasForeignKey<Solution>(so => so.SolutionTypeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Solution>()
            .HasOne(s => s.SolutionOutput)
            .WithOne(so => so.Solution)
            .HasForeignKey<SolutionOutput>(so => so.SolutionId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    //partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
