using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class ProblemType
{
    public string Id { get; set; } = null!;

    public string? TopicId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Solution> Solutions { get; set; } = new List<Solution>();

    public virtual Topic? Topic { get; set; }
}
