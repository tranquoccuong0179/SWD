using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.AuthVM;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        public readonly IAuthService _authService = authService;

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
    }
}
