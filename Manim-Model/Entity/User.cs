using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class User
{
    public string Id { get; set; } = null!;

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public long? Gender { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public bool? Status { get; set; }

    public string? Avatar { get; set; }

    public virtual ICollection<Deposit> Deposits { get; set; } = new List<Deposit>();

    public virtual ICollection<Solution> Solutions { get; set; } = new List<Solution>();

    public virtual Wallet? Wallet { get; set; }
}
