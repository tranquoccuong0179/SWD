using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Transaction
{
    public string Id { get; set; } = null!;

    public string? WalletId { get; set; }

    public string? SolutionId { get; set; }

    public string? DepositId { get; set; }

    public string? Username { get; set; }

    public decimal? Amount { get; set; }

    public DateTime? BillingDate { get; set; }

    public string? Status { get; set; }

    public virtual Deposit? Deposit { get; set; }

    public virtual Solution? Solution { get; set; }

    public virtual Wallet? Wallet { get; set; }
}
