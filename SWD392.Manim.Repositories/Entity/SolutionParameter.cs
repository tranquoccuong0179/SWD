namespace SWD392.Manim.Repositories.Entity
{
    public class SolutionParameter
    {
        public string ParameterId { get; set; } = string.Empty;
        public string SolutionTypeId { get; set; } = string.Empty;
        public double Value { get; set; }
        public virtual Parameter? Parameter { get; set; }
        public virtual SolutionType? SolutionType { get; set; }
        public string? Createdby { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}
