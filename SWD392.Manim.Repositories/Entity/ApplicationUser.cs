using Microsoft.AspNetCore.Identity;

namespace SWD392.Manim.Repositories.Entity;

public partial class ApplicationUser : IdentityUser<Guid>
{
    public string? FullName { get; set; }
    public long? Gender { get; set; }
    public DateTime CreateAt { get; set; }
    public DateTime UpdateAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public bool? Status { get; set; }
    public string? Avatar { get; set; }
    public virtual ICollection<Deposit> Deposits { get; set; } = new List<Deposit>();
    public virtual ICollection<Solution> Solutions { get; set; } = new List<Solution>();
    public virtual Wallet? Wallet { get; set; }
}
