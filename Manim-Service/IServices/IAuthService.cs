using Manim_Model.Entity;
using Manim_Model.ViewModel.AuthVM;
using Manim_Model.ViewModel.UserVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface IAuthService
    {
        Task<GetSignInVM> SignIn(PostSignInVM model);
        Task SignUp(PostSignUpVM model);
        GetTokenVM GenerateTokens(ApplicationUser user);
    }
}
