using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.SolutionTypeVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface ISolutionTypeService
    {
        Task DeleteSolutionType(string id);
        Task<PaginatedList<GetSolutionTypesVM>?> GetSolutionTypes(int index, int pageSize, string? id, string? nameSearch);
        Task PostSolutionType(PostSolutionTypeVM model);
        Task PutSolutionType(string id, PostSolutionTypeVM model);
    }
}
