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
        Task DeleteSolution(object model);
        Task<GetSolutionsVM?> GetSolutions();
        Task PostSolution(PostSolutionVM model);
        Task PutSolution(string id, PostSolutionVM model);
    }
}
