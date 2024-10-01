using Microsoft.AspNetCore.Identity;

namespace SWD392.Manim.Repositories.Entity;
public class ApplicationUserClaims : IdentityUserClaim<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}
