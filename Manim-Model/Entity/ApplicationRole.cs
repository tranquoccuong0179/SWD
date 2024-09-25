using Microsoft.AspNetCore.Identity;

namespace Manim_Model.Entity;

public partial class ApplicationRole : IdentityRole<Guid>
{
    public string? FullName { get; set; }
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}