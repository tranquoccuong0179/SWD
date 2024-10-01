using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.SolutionVM;

namespace SWD392.Manim.Services.Services
{
    public interface ISolutionService
    {
        Task DeleteSolution(string id);
        Task<GetSolutionsVM?> GetSolutionById(string id);
        Task<PaginatedList<GetSolutionsVM>?> GetSolutions(int index, int pageSize, string? id, string? nameSearch);
        Task PostSolution(PostSolutionVM model);
        Task PutSolution(string id, PostSolutionVM model);
    }
}
