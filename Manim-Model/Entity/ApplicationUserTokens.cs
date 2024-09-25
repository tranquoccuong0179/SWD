using Microsoft.AspNetCore.Identity;

namespace NhaMayMay.Contract.Repositories.Entity;

public class ApplicationUserTokens : IdentityUserToken<Guid>
{
    public DateTime? CreateAt { get; set; }
    public DateTime? UpdateAt { get; set; }
}

