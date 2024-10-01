using SWD392.Manim.Repositories.ViewModel.AuthVM;

namespace SWD392.Manim.Services.Services
{
    public interface IUserService
    {
        Task<GetTokenVM> CreateTokenByEmail(string email);
        Task<bool> GetAccountByEmail(string email);
        Task<GetSignInByGoogleVM> CreateNewUserAccountByGoogle(GoogleAuthVM response);
    }
}
