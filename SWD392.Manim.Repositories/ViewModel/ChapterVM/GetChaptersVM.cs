using SWD392.Manim.Repositories.ViewModel.TopicVM;

namespace SWD392.Manim.Repositories.ViewModel.ChapterVM
{
    public class GetChaptersVM
    {
        public string Id { get; set; } = string.Empty;
        public string SubjectId { get; set; } = string.Empty;
        public string SubjectName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public bool Status { get; set; } = true;
        public IEnumerable<GetTopicNamesVM>? Topics { get; set; }
    }
}
