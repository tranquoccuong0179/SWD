using SWD392.Manim.Repositories.Base;

namespace SWD392.Manim.Repositories.Entity;

public partial class Transaction : BaseEntity
{
    public string? WalletId { get; set; }
    public string? SolutionId { get; set; }
    public string? DepositId { get; set; }
    public string? Username { get; set; }
    public decimal? Amount { get; set; }
    public DateTime? BillingDate { get; set; }
    public virtual Deposit? Deposit { get; set; }
    public virtual Solution? Solution { get; set; }
    public virtual Wallet? Wallet { get; set; }
}
