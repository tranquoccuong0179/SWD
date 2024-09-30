using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.SubjectVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface ISubjectService
    {
        Task DeleteSubject(string id);
        Task<GetSubjectsVM?> GetSubjectById(string id);
        Task<PaginatedList<GetSubjectsVM>?> GetSubjects(int index, int pageSize, string? id, string? nameSearch);
        Task PostSubject(PostSubjectVM model);
        Task PutSubject(string id, PostSubjectVM model);
    }
}
