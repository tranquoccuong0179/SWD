using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ProblemVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface IProblemService
    {
        Task DeleteProblem(string id);
        Task<PaginatedList<GetProblemsVM>?> GetProblems(int index, int pageSize, string? id, string? nameSearch);
        Task PostProblem(PostProblemVM model);
        Task PutProblem(string id, PostProblemVM model);
    }
}
