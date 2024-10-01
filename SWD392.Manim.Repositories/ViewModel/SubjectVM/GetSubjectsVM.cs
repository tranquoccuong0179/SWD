using SWD392.Manim.Repositories.ViewModel.ChapterVM;

namespace SWD392.Manim.Repositories.ViewModel.SubjectVM
{
    public class GetSubjectsVM
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool Status { get; set; } = true;
        public IEnumerable<GetChapterNamesVM>? Chapters { get; set; }

    }
}
