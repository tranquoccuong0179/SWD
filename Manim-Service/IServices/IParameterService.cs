using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ParameterVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface IParameterService
    {
        Task DeleteParameter(string id);
        Task<PaginatedList<GetParametersVM>?> GetParameters(int index, int pageSize, string? id, string? nameSearch);
        Task PostParameter(PostParameterVM model);
        Task PutParameter(string id, PostParameterVM model);
    }
}
