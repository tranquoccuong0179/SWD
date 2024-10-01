using Microsoft.AspNetCore.Identity;

namespace SWD392.Manim.Repositories.Entity;

public class ApplicationUserTokens : IdentityUserToken<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}

