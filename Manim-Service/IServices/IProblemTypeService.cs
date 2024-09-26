using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ProblemTypeVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface IProblemTypeService
    {
        Task DeleteProblemType(string id);
        Task<PaginatedList<GetProblemTypesVM>?> GetProblemTypes(int index, int pageSize, string? id, string? nameSearch);
        Task PostProblemType(PostProblemTypeVM model);
        Task PutProblemType(string id, PostProblemTypeVM model);
    }
}
