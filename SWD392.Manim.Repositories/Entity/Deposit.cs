using SWD392.Manim.Repositories.Base;

namespace SWD392.Manim.Repositories.Entity;

public partial class Deposit : BaseEntity
{
    public string UserId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string AccountNo { get; set; } = string.Empty;
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    public virtual ApplicationUser? User { get; set; }
}
