using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Solution : BaseEntity
{
    public string ProblemTypeId { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public virtual ProblemType? ProblemType { get; set; }
    public virtual ICollection<SolutionType> SolutionTypes { get; set; } = new List<SolutionType>();
    public virtual ApplicationUser? User { get; set; }
}
