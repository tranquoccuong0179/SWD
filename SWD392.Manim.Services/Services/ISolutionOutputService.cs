using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.SolutionOutputVM;

namespace SWD392.Manim.Services.Services
{
    public interface ISolutionOutputService
    {
        Task<PaginatedList<GetSolutionOutputsVM>?> GetSolutionOutputs(int index, int pageSize, string? id, string? nameSearch);
        Task PostSolutionOutput(PostSolutionOutputVM model);
        Task PutSolutionOutput(string id, PostSolutionOutputVM model);
        Task DeleteSolutionOutput(string id);
        Task<GetSolutionOutputsVM?> GetSolutionOutputById(string id);
    }
}
