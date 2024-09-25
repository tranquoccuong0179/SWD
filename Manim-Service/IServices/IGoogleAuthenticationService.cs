using Manim_Model.ViewModel.AuthVM;
using Manim_Model.ViewModel.UserVM;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface IGoogleAuthenticationService
    {
        public Task<GoogleAuthVM> AuthenticateGoogleUser(HttpContext context);

    }
}

