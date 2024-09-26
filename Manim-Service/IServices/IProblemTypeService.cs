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
        Task<GetProblemTypesVM?> GetProblemTypes();
        Task PostProblemType(PostProblemTypeVM model);
        Task PutProblemType(string id, PostProblemTypeVM model);
    }
}
