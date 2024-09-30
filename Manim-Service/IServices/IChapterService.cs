using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ChapterVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface IChapterService
    {
        Task DeleteChapter(string id);
        Task<GetChaptersVM?> GetChapterById(string id);
        Task<PaginatedList<GetChaptersVM>?> GetChapters(int index, int pageSize, string? id, string? nameSearch);
        Task PostChapter(PostChapterVM model);
        Task PutChapter(string id, PostChapterVM model);
    }
}
