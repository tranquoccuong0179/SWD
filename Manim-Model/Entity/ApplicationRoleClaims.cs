using Microsoft.AspNetCore.Identity;

namespace Manim_Model.Entity;
public class ApplicationRoleClaims : IdentityRoleClaim<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}
