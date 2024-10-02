using Microsoft.EntityFrameworkCore;

namespace SWD392.Manim.Repositories.Repository.Interface
{
    public interface IUnitOfWork : IGenericRepositoryFactory, IDisposable
    {
        int Commit();

        Task<int> CommitAsync();
    }

    public interface IUnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
    {
        TContext Context { get; }
    }
}
