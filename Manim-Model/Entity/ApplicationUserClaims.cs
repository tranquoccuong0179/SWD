using Microsoft.AspNetCore.Identity;

namespace Manim_Model.Entity;
public class ApplicationUserClaims : IdentityUserClaim<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}
