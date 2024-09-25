using Microsoft.AspNetCore.Identity;

namespace Manim_Model.Entity;
public class ApplicationUserRoles : IdentityUserRole<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}
