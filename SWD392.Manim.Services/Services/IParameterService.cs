using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.ParameterVM;

namespace SWD392.Manim.Services.Services
{
    public interface IParameterService
    {
        Task DeleteParameter(string id);
        Task<GetParametersVM?> GetParameterById(string id);
        Task<PaginatedList<GetParametersVM>?> GetParameters(int index, int pageSize, string? id, string? nameSearch);
        Task PostParameter(PostParameterVM model);
        Task PutParameter(string id, PostParameterVM model);
    }
}
