using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.ChapterVM;

namespace SWD392.Manim.Services.Services
{
    public interface IChapterService
    {
        Task<GetChaptersVM?> GetChapterById(string id);
        Task<PaginatedList<GetChaptersVM>?> GetChapters(int index, int pageSize, string? id, string? nameSearch);
        Task PostChapter(PostChapterVM model);
        Task PutChapter(string id, PostChapterVM model);
        Task DeleteChapter(string id);

    }
}
