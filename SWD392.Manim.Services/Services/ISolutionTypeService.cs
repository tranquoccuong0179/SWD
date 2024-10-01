using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.SolutionTypeVM;

namespace SWD392.Manim.Services.Services
{
    public interface ISolutionTypeService
    {
        Task DeleteSolutionType(string id);
        Task<GetSolutionTypesVM?> GetSolutionTypeById(string id);
        Task<PaginatedList<GetSolutionTypesVM>?> GetSolutionTypes(int index, int pageSize, string? id, string? nameSearch);
        Task PostSolutionType(PostSolutionTypeVM model);
        Task PutSolutionType(string id, PostSolutionTypeVM model);
    }
}
