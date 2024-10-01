using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.ProblemVM;

namespace SWD392.Manim.Services.Services
{
    public interface IProblemService
    {
        Task DeleteProblem(string id);
        Task<GetProblemsVM?> GetProblemById(string id);
        Task<PaginatedList<GetProblemsVM>?> GetProblems(int index, int pageSize, string? id, string? nameSearch);
        Task PostProblem(PostProblemVM model);
        Task PutProblem(string id, PostProblemVM model);
    }
}
