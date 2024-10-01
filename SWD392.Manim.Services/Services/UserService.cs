using AutoMapper;
using SWD392.Manim.Repositories.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.AuthVM;

namespace SWD392.Manim.Services.Services
{
    public class UserService : IUserService
    {
        private IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;

        public UserService(IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, IMapper mapper, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            _configuration = builder.Build();
            _mapper = mapper;
            _authService = authService;
        }
        public async Task<GetSignInByGoogleVM> CreateNewUserAccountByGoogle(GoogleAuthVM request)
        {
            var newUser = new ApplicationUser()
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                FullName = request.Name,
                UserName = request.Email.Split("@")[0],
                PhoneNumber = "0",
                PasswordHash = HashPasswordService.HashPasswordThrice("12345678"),
                CreateAt = DateTime.Now
            };
            ApplicationRole roleUser = _unitOfWork.GetRepository<ApplicationRole>().Entities.Where(x => x.Name == "User").FirstOrDefault()
                ?? throw new ErrorException(StatusCodes.Status404NotFound, ResponseCodeConstants.NOT_FOUND, "Vai trò không tồn tại");
            ApplicationUserRoles userRoles = new()
            {
                UserId = newUser.Id,
                RoleId = roleUser.Id,
                CreateAt = DateTime.Now,
                UpdateAt = DateTime.Now
            };
            await _unitOfWork.GetRepository<ApplicationUserRoles>().InsertAsync(userRoles);
            await _unitOfWork.GetRepository<ApplicationUser>().InsertAsync(newUser);
            GetSignInByGoogleVM response = null;
            bool isSuccessful = await _unitOfWork.CommitAsync() > 0;
            if (isSuccessful)
            {

                response = new GetSignInByGoogleVM()
                {
                    Email = newUser.Email,
                    FullName = newUser.FullName
                };
            }
            return response;
        }

        public async Task<GetTokenVM> CreateTokenByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("Username cannot be null or empty", nameof(email));
            }
            var account = await _unitOfWork.GetRepository<ApplicationUser>().SingleOrDefaultAsync(
                predicate: p => p.Email.Equals(email)
            );
            if (account == null) throw new BadHttpRequestException("Account not found");
            var guidClaim = new Tuple<string, Guid>("userId", account.Id);
            var token = _authService.GenerateTokens(account, "");
            // _logger.LogInformation($"Token: {token} ");
            return token;
        }

        public async Task<bool> GetAccountByEmail(string email)
        {
            if (email == null) throw new BadHttpRequestException("Email cannot be null");

            var account = await _unitOfWork.GetRepository<ApplicationUser>().SingleOrDefaultAsync(
                predicate: p => p.Email.Equals(email)
            );
            return account != null;
        }

    }
}
