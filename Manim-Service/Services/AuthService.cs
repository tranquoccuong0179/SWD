using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Manim_Model.ViewModel.AuthVM;
using Manim_Model.ViewModel.UserVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Manim_Service.Services
{
    public class AuthService : IAuthService
    {
        private IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthService(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            _configuration = builder.Build();
            _mapper = mapper;
        }

        public async Task<GetSignInVM> SignIn(PostSignInVM model)
        {
            ApplicationUser? user = await _unitOfWork.GetRepository<ApplicationUser>().Entities.FirstOrDefaultAsync(p => p.UserName == model.Username);
            if (user == null)
            {
                throw new ErrorException(StatusCodes.Status401Unauthorized, ErrorCode.UnAuthorized, "Số điện thoại này chưa có tài khoản! Vui lòng đăng ký!");
            }
            if (user.PasswordHash != HashPasswordService.HashPasswordThrice(model.Password))
            {
                throw new ErrorException(StatusCodes.Status401Unauthorized, ErrorCode.UnAuthorized, "Số điện thoại hoặc mật khẩu không đúng!");
            }
            GetTokenVM token = GenerateTokens(user);
            return new GetSignInVM()
            {
                User = _mapper.Map<GetUserVM>(user),
                Token = token
            };
        }

        public async Task SignUp(PostSignUpVM model)
        {
            ApplicationUser? user = await _unitOfWork.GetRepository<ApplicationUser>().Entities.FirstOrDefaultAsync(p => p.UserName == model.Username);
            if (user != null)
            {
                throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Số điện thoại này đã được đăng ký! Vui lòng đăng nhập!");
            }
            if (model.Password != model.ConfirmPassword)
            {
                throw new ErrorException(StatusCodes.Status400BadRequest, ErrorCode.InvalidInput, "Mật khẩu và xác nhận mật khẩu không khớp!");
            }
            ApplicationUser newUser = new ApplicationUser()
            {
                UserName = model.Username,
                PasswordHash = HashPasswordService.HashPasswordThrice(model.Password),
                PhoneNumber = model.Phone,
                Email = model.Email,
                Gender = model.Gender,
                FullName = model.FullName,               
                CreateAt = DateTime.Now
            };
            await _unitOfWork.GetRepository<ApplicationUser>().InsertAsync(newUser);
            await _unitOfWork.CommitAsync();
        }
        public GetTokenVM GenerateTokens(ApplicationUser user)
        {
            DateTime now = DateTime.Now;

            // Common claims for both tokens
            List<Claim> claims =
            [
                new Claim("id", user.Id.ToString()),
                new Claim("exp", now.Ticks.ToString())
            ];

            var keyString = _configuration.GetSection("JWT:SecretKey").Value ?? string.Empty;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));

            var claimsIdentity = new ClaimsIdentity(claims, "Bearer");
            var principal = new ClaimsPrincipal(new[] { claimsIdentity });
            _httpContextAccessor.HttpContext.User = principal;
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            // Generate access token
            var accessToken = new JwtSecurityToken(
                claims: claims,
                issuer: _configuration.GetSection("JWT:Issuer").Value,
                audience: _configuration.GetSection("JWT:Audience").Value,
                expires: now.AddMinutes(30),
                signingCredentials: creds
            );
            var accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

            // Generate refresh token
            var refreshToken = new JwtSecurityToken(
                claims: claims,
                issuer: _configuration.GetSection("JWT:Issuer").Value,
                audience: _configuration.GetSection("JWT:Audience").Value,
                expires: now.AddDays(7),
                signingCredentials: creds
            );
            var refreshTokenString = new JwtSecurityTokenHandler().WriteToken(refreshToken);

            // Return the tokens and user information
            return new GetTokenVM
            {
                AccessToken = accessTokenString,
                RefreshToken = refreshTokenString
            };
        }
    }
}
