using SWD392.Manim.Repositories.Base;

namespace SWD392.Manim.Repositories.Entity;

public partial class Topic : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public long? Number { get; set; }
    public bool Status { get; set; } = true;
    public string ChapterId { get; set; } = string.Empty;
    public virtual Chapter? Chapter { get; set; }
    public virtual ICollection<Problem> Problems { get; set; } = new List<Problem>();
}
