using Manim_Model.ViewModel.AuthVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface IUserService
    {
        Task<GetTokenVM> CreateTokenByEmail(string email);

        Task<bool> GetAccountByEmail(string email);
        Task<GetSignInByGoogleVM> CreateNewUserAccountByGoogle(GoogleAuthVM response);
    }
}
