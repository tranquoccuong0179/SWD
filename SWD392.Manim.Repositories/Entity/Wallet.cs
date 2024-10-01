using SWD392.Manim.Repositories.Base;

namespace SWD392.Manim.Repositories.Entity;

public partial class Wallet : BaseEntity
{
    public Guid? UserId { get; set; }
    public decimal? Balance { get; set; }
    public EnumWallet Status { get; set; } = EnumWallet.Processing;
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    public virtual ApplicationUser? User { get; set; }
}
