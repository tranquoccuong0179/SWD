using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class ProblemType : BaseEntity
{
    public string TopicId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public virtual ICollection<Solution> Solutions { get; set; } = new List<Solution>();
    public virtual Topic? Topic { get; set; }
}
