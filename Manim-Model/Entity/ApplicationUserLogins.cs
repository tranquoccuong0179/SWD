using Microsoft.AspNetCore.Identity;


namespace NhaMayMay.Contract.Repositories.Entity;
public class ApplicationUserLogins : IdentityUserLogin<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}
