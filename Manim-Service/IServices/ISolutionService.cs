using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.SolutionVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
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
