using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Topic
{
    public string Id { get; set; } = null!;

    public string? ChapterId { get; set; }

    public long? Number { get; set; }

    public bool? Status { get; set; }

    public virtual Chapter? Chapter { get; set; }

    public virtual ICollection<ProblemType> ProblemTypes { get; set; } = new List<ProblemType>();
}
