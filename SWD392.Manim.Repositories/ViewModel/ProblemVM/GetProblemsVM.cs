namespace SWD392.Manim.Repositories.ViewModel.ProblemVM
{
    public class GetProblemsVM
    {
        public string Id { get; set; } = string.Empty;
        public string TopicId { get; set; } = string.Empty;
        public string TopicName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
