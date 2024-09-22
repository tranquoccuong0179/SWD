using Microsoft.AspNetCore.Identity;

namespace NhaMayMay.Contract.Repositories.Entity;
public class ApplicationUserClaims : IdentityUserClaim<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}
