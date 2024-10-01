using Microsoft.AspNetCore.Identity;

namespace SWD392.Manim.Repositories.Entity;
public class ApplicationUserLogins : IdentityUserLogin<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}
