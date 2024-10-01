using SWD392.Manim.Repositories.ViewModel.ProblemVM;

namespace SWD392.Manim.Repositories.ViewModel.TopicVM
{
    public class GetTopicsVM
    {
        public string Id { get; set; } = string.Empty;
        public string ChapterId { get; set; } = string.Empty;
        public string ChapterName { get; set; } = string.Empty;
        public long? Number { get; set; }
        public bool Status { get; set; } = true;
        public IEnumerable<GetProblemNamesVM>? Problems { get; set; }

    }
}
