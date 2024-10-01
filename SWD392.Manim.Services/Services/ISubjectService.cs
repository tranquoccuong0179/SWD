using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.SubjectVM;

namespace SWD392.Manim.Services.Services
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
