using Manim_API.Constants;
using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.AuthVM;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Manim_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService, IUserService userService, IGoogleAuthenticationService googleAuthenticationService) : ControllerBase
    {
        public readonly IAuthService _authService = authService;
        private readonly IUserService _userService = userService;
        private readonly IGoogleAuthenticationService _googleAuthenticationService = googleAuthenticationService;


        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(PostSignUpVM model)
        {
            await _authService.SignUp(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Đăng ký thành công"));
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(PostSignInVM model)
        {
            GetSignInVM result = await _authService.SignIn(model);
            return Ok(new BaseResponseModel<GetSignInVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }

        [HttpGet("google-auth/login")]
        public IActionResult Login()
        {
            var props = new AuthenticationProperties { RedirectUri = $"api/Auth/google-auth/signin-google" };
            return Challenge(props, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-auth/signin-google")]
        public async Task<IActionResult> SignInGoogle()
        {
            GoogleAuthVM googleAuthResponse = await _googleAuthenticationService.AuthenticateGoogleUser(HttpContext);
            var checkAccount = await _userService.GetAccountByEmail(googleAuthResponse.Email);
            if (!checkAccount)
            {
                var response = await _userService.CreateNewUserAccountByGoogle(googleAuthResponse);
                if (response == null)
                {
                    return Problem("Tài khoản không tồn tại");
                }
            }
            var token = await _userService.CreateTokenByEmail(googleAuthResponse.Email);
            googleAuthResponse.Token = token;
            return Ok(new BaseResponseModel<GoogleAuthVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: googleAuthResponse));
        }
    }
}
