using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.Repository.Interface;
using SWD392.Manim.Repositories.Entity;
using System.Net;
using System.Text.Json;

namespace SWD392.Manim.API.Middlewares
{
    public class PermissionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<PermissionMiddleware> _logger;
        private readonly Dictionary<string, List<string>> _rolePermissions;
        private readonly IEnumerable<string> _excludedUris;

        public PermissionMiddleware(RequestDelegate next, ILogger<PermissionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
            _excludedUris =
            [
                "/api/auth/SignIn",
                "/api/auth/SignUp",
                "/api/wallet/create",
                "/api/auth/google-auth/login",
                "/api/auth/google-auth/signin-google"
            ];
            _rolePermissions = new Dictionary<string, List<string>>()
            {
                //author bang role, roleClaim userClaim
                { "User", new List<string> { "/api/subjects"} }
            };

        }

        public async Task Invoke(HttpContext context, IUnitOfWork unitOfWork)
        {
            if (HasPermission(context, unitOfWork))
            {
                await _next(context);
            }
            else
            {
                await Authentication.HandleForbiddenRequest(context);
            }
        }

        private bool HasPermission(HttpContext context, IUnitOfWork unitOfWork)
        {
            bool isPersmission = false;
            string requestUri = context.Request.Path.Value!;

            if (_excludedUris.Contains(requestUri) || !requestUri.StartsWith("/api/"))
                return true;

            string[] segments = requestUri.Split('/');

            string featureUri = string.Join("/", segments.Take(segments.Length - 1));

            string controller = segments.Length > 2 ? $"/api/{segments[2]}" : string.Empty;

            try
            {
                string idUser = Authentication.GetUserIdFromHttpContext(context);
                if (Guid.TryParse(idUser, out Guid guidId))
                {
                    ApplicationUser? user = unitOfWork.GetRepository<ApplicationUser>().Entities.Where(x => x.Id == guidId & !x.DeletedAt.HasValue).FirstOrDefault();
                    if (user is null)
                    {
                        isPersmission = false;
                    }
                }

                string userRole = Authentication.GetUserRoleFromHttpContext(context);

                //// If the user role is admin, allow access to all controllers
                if (userRole == "AdminSystem") return true;

                // Check if the user's role has permission to access the requested controller
                if (_rolePermissions.TryGetValue(userRole, out var allowedControllers))
                {
                    return allowedControllers.Any(uri => requestUri.StartsWith(uri, System.StringComparison.OrdinalIgnoreCase));
                }
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while checking permissions");
            }
            return isPersmission;
        }
        private static async Task HandleForbiddenRequest(HttpContext context)
        {
            int code = (int)HttpStatusCode.Forbidden;
            var a = new ErrorException(code, ResponseCodeConstants.FORBIDDEN, "Không tìm thấy tài khoản");
            string result = JsonSerializer.Serialize(a);
            //string result = JsonSerializer.Serialize(new { error = "You don't have permission to access this feature" });

            context.Response.ContentType = "application/json";
            //context.Response.Headers?.Add("Access-Control-Allow-Origin", "*");
            context.Response.Headers?.Append("Access-Control-Allow-Origin", "*");
            //context.Response.Headers!["Access-Control-Allow-Origin"] = "*";

            context.Response.StatusCode = code;

            await context.Response.WriteAsync(result);
        }
    }
}
