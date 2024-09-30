using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Problem : BaseEntity
{
    public string TopicId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public virtual ICollection<SolutionType> SolutionTypes { get; set; } = new List<SolutionType>();
    public virtual Topic? Topic { get; set; }
}
