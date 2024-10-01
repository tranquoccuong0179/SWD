using SWD392.Manim.Repositories.Base;

namespace SWD392.Manim.Repositories.Entity
{
    public class SolutionOutput : BaseEntity
    {
        public string SolutionId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public virtual Solution? Solution { get; set; }

    }
}
