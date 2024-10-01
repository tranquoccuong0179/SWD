using SWD392.Manim.Repositories.Base;

namespace SWD392.Manim.Repositories.Entity
{
    public class Parameter : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Unit { get; set; } = string.Empty;
        public virtual ICollection<SolutionParameter> SolutionParameters { get; set; } = new List<SolutionParameter>();
    }
}
