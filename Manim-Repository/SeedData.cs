using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace Manim_Repository
{
    public class SeedData
    {
        private readonly Swd392Context _context;
        public SeedData(Swd392Context context)
        {
            _context = context;
        }

        public void SeedingData()
        {
            try
            {
                if (_context.Database.IsSqlServer())
                {
                    if (_context.Database.IsSqlServer())
                    {
                        bool dbExists = _context.Database.CanConnect();
                        if (dbExists)
                        {
                            _context.Database.Migrate();
                        }
                        Seed();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            finally
            {
                _context.Dispose();
            }
        }
        public void Seed()
        {
            int data = 0;
            data = _context.ApplicationRoles.Count();
            if (data is 0)
            {
                ApplicationRole[] roles = CreateRoleRole();
                _context.AddRange(roles);
            }

            data = _context.ApplicationUsers.Count();
            if (data is 0)
            {
                ApplicationUser[] user = CreateUser();
                _context.AddRange(user);
            }
            _context.SaveChanges();

            AssignAdminRoleToUser("khanhnvn", "AdminSystem");
            AssignAdminRoleToUser("vudq", "User");
            AssignAdminRoleToUser("cuongtd", "User");
            AssignAdminRoleToUser("nghiatm", "User");
            AssignAdminRoleToUser("cuongtq", "User");
            AssignAdminRoleToUser("triethlm", "User");
            _context.SaveChanges();
        }

        private static ApplicationRole[] CreateRoleRole()
        {
            ApplicationRole[] roles =
              [
            new ApplicationRole
            {
                Name = "AdminSystem",
                NormalizedName = "ADMINSYSTEM",
                FullName ="Quản trị hệ thống",
                ConcurrencyStamp = Guid.NewGuid().ToString()
            },
            new ApplicationRole
            {
                Name = "User",
                NormalizedName = "USER",
                FullName = "Người dùng",
                ConcurrencyStamp = Guid.NewGuid().ToString()
            }
        ];
            return roles;
        }

        private static ApplicationUser[] CreateUser()
        {
            ApplicationUser[] users =
            [
                new ApplicationUser
            {
                UserName = "triethlm",
                FullName = "Hoàng Lê Minh Triết",
                PhoneNumber = "0999999999",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PasswordHash = HashPasswordService.HashPasswordThrice("triethlm")
            },
            new ApplicationUser
            {
                UserName = "cuongtq",
                FullName = "Trần Quốc Cường",
                PhoneNumber = "0111111111",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PasswordHash = HashPasswordService.HashPasswordThrice("cuongtq")
            },
            new ApplicationUser
            {
                UserName = "nghiatm",
                FullName = "Trần Minh Nghĩa",
                PhoneNumber = "0777777777",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PasswordHash = HashPasswordService.HashPasswordThrice("nghiatm")
            },
            new ApplicationUser
            {
                UserName = "khanhnvn",
                FullName = "Nguyễn Viết Nam Khánh",
                PhoneNumber = "0919385156",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PasswordHash = HashPasswordService.HashPasswordThrice("khanhnvn")
            },
            new ApplicationUser
            {
                UserName = "cuongtd",
                FullName = "Tạ Đức Cường",
                PhoneNumber = "0888888888",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PasswordHash = HashPasswordService.HashPasswordThrice("cuongtd")
            },
            new ApplicationUser
            {
                UserName = "vudq",
                FullName = "Đào Quang Vũ",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PasswordHash = HashPasswordService.HashPasswordThrice("vudq")
            }
            ];
            return users;
        }

        private void AssignAdminRoleToUser(string username, string roleName)
        {
            var user = _context.ApplicationUsers.FirstOrDefault(u => u.UserName == username);
            var role = _context.ApplicationRoles.FirstOrDefault(r => r.Name == roleName);


            if (user != null && role != null)
            {
                if (!_context.UserRoles.Any(ur => ur.UserId == user.Id && ur.RoleId == role.Id))
                {
                    ApplicationUserRoles userRoles = new()
                    {
                        UserId = user.Id,
                        RoleId = role.Id
                    };
                    _context.UserRoles.Add(userRoles);
                    _context.SaveChanges();
                }
            }
        }
    }
}
