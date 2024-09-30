using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ChapterVM;
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
        Task<PaginatedList<GetSolutionOutputsVM>?> GetSolutionOutputs(int index, int pageSize, string? id, string? nameSearch);
        Task PostSolutionOutput(PostSolutionOutputVM model);
        Task PutSolutionOutput(string id, PostSolutionOutputVM model);
        Task DeleteSolutionOutput(string id);
        Task<GetSolutionOutputsVM?> GetSolutionOutputById(string id);
    }
}
