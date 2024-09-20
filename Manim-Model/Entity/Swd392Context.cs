using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Manim_Model.Entity;

public partial class Swd392Context : DbContext
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

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Wallet> Wallets { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=sqlswd.database.windows.net;Database=SWD392;User Id=sqladmin;Password=SE172527@;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Chapter>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Chapter__3214EC270DB44C71");

            entity.ToTable("Chapter");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.Createby)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SubjectId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UpdateAt).HasColumnType("datetime");

            entity.HasOne(d => d.Subject).WithMany(p => p.Chapters)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__Chapter__Subject__5EBF139D");
        });

        modelBuilder.Entity<Deposit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Deposit__3214EC27F92EC62F");

            entity.ToTable("Deposit");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.AccountNo)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Code)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserId)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.Deposits)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Deposit__UserId__70DDC3D8");
        });

        modelBuilder.Entity<ProblemType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ProblemT__3214EC27A2583BE3");

            entity.ToTable("ProblemType");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.TopicId)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Topic).WithMany(p => p.ProblemTypes)
                .HasForeignKey(d => d.TopicId)
                .HasConstraintName("FK__ProblemTy__Topic__6477ECF3");
        });

        modelBuilder.Entity<Solution>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Solution__3214EC272AF378AA");

            entity.ToTable("Solution");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ProblemTypeId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserId)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.ProblemType).WithMany(p => p.Solutions)
                .HasForeignKey(d => d.ProblemTypeId)
                .HasConstraintName("FK__Solution__Proble__6D0D32F4");

            entity.HasOne(d => d.User).WithMany(p => p.Solutions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Solution__UserId__6E01572D");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Subject__3214EC27006F6BDF");

            entity.ToTable("Subject");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.Createdby)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UpdateAt).HasColumnType("datetime");
        });

        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Topic__3214EC27F758D9A5");

            entity.ToTable("Topic");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.ChapterId)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Chapter).WithMany(p => p.Topics)
                .HasForeignKey(d => d.ChapterId)
                .HasConstraintName("FK__Topic__ChapterId__619B8048");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Transact__3214EC2767D8A0E1");

            entity.ToTable("Transaction");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.BillingDate).HasColumnType("datetime");
            entity.Property(e => e.DepositId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SolutionId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.WalletId)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Deposit).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.DepositId)
                .HasConstraintName("FK__Transacti__Depos__75A278F5");

            entity.HasOne(d => d.Solution).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.SolutionId)
                .HasConstraintName("FK__Transacti__Solut__74AE54BC");

            entity.HasOne(d => d.Wallet).WithMany(p => p.Transactions)
                .HasForeignKey(d => d.WalletId)
                .HasConstraintName("FK__Transacti__Walle__73BA3083");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC2729E16E11");

            entity.ToTable("User");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.Avatar)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CreateAt).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UpdateAt).HasColumnType("datetime");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Wallet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Wallet__3214EC27E663390D");

            entity.ToTable("Wallet");

            entity.HasIndex(e => e.UserId, "UQ__Wallet__1788CC4D3FC89529").IsUnique();

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("ID");
            entity.Property(e => e.Balance).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.UserId)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithOne(p => p.Wallet)
                .HasForeignKey<Wallet>(d => d.UserId)
                .HasConstraintName("FK__Wallet__UserId__6A30C649");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
