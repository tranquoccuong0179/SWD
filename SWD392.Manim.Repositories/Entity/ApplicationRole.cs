using Microsoft.AspNetCore.Identity;

namespace SWD392.Manim.Repositories.Entity;

public partial class ApplicationRole : IdentityRole<Guid>
{
    public string? FullName { get; set; }
    public DateTime CreateAt { get; set; }
    public DateTime UpdateAt { get; set; }
    public DateTime? DeletedAt { get; set; }

}