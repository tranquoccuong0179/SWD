using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Solution : BaseEntity
{
    public string SolutionTypeId { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    public virtual SolutionType? SolutionType { get; set; }
    public virtual SolutionOutput? SolutionOutput { get; set; }
    public virtual ApplicationUser? User { get; set; }
}
