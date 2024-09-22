using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Wallet
{
    public string Id { get; set; } = null!;

    public string? UserId { get; set; }

    public decimal? Balance { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual ApplicationUser? User { get; set; }
}
