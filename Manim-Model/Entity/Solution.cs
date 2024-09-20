using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Solution
{
    public string Id { get; set; } = null!;

    public string? ProblemTypeId { get; set; }

    public string? UserId { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public virtual ProblemType? ProblemType { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual User? User { get; set; }
}
