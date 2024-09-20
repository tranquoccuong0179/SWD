using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Deposit
{
    public string Id { get; set; } = null!;

    public string? UserId { get; set; }

    public string? Name { get; set; }

    public string? Code { get; set; }

    public decimal? Amount { get; set; }

    public string? Description { get; set; }

    public string? AccountNo { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual User? User { get; set; }
}
