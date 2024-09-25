using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Topic : BaseEntity
{
    public string ChapterId { get; set; } = string.Empty;
    public long? Number { get; set; }
    public bool Status { get; set; } = true;
    public virtual Chapter? Chapter { get; set; }
    public virtual ICollection<ProblemType> ProblemTypes { get; set; } = new List<ProblemType>();
}
