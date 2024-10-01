using Microsoft.AspNetCore.Http;
using SWD392.Manim.Repositories.ViewModel.AuthVM;

namespace SWD392.Manim.Services.Services
{
    public interface IGoogleAuthenticationService
    {
        public Task<GoogleAuthVM> AuthenticateGoogleUser(HttpContext context);

    }
}

