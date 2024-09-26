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
        Task DeleteChapter(object model);
        Task<GetChaptersVM?> GetChapters();
        Task PostChapter(PostChapterVM model);
        Task PutChapter(string id, PostChapterVM model);
    }
}
