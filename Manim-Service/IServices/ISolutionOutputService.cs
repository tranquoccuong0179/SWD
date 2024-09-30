using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.SolutionOutputVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface ISolutionOutputService
    {
        Task<PaginatedList<GetSolutionOutputsVM>?> GetSolutions(int index, int pageSize, string? id, string? nameSearch);
        Task PostSolution(PostSolutionOutputVM model);
        Task PutSolution(string id, PostSolutionOutputVM model);
        Task DeleteSolution(string id);

    }
}
