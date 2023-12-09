using GnTeq.Models.DTO;
using GnTeq.Models.Interface;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace GnTeq.Models.Services
{
    public class IdentityAdminService :IAdmin
    {
        private UserManager<AppUser> userManager;
        private SignInManager<AppUser> signInManager;
        private readonly JWTTokenService jwtTokenService;
        public IdentityAdminService(UserManager<AppUser> _userManager, SignInManager<AppUser> _signInManager, JWTTokenService jwtTokenService)
        {
            this.userManager = _userManager;
            this.signInManager = _signInManager;
            this.jwtTokenService = jwtTokenService;
        }

        public async Task<AdminDTO> Authenticate(string username, string password)
        {
            var result = await signInManager.PasswordSignInAsync(username, password, true, false);
            if (result.Succeeded)
            {
                var user = await userManager.FindByNameAsync(username);
                bool isValid = await userManager.CheckPasswordAsync(user, password);
                if (isValid)
                {
                return new AdminDTO
                {
                    Id = user.Id,
                    userName = user.UserName,
                    Token = await jwtTokenService.GetToken(user,System.TimeSpan.FromMinutes(60)),
                    Roles = await userManager.GetRolesAsync(user)
                };

                }
            }
            return null;
        }

        public async Task<AdminDTO> GetUser(ClaimsPrincipal user)
        {
            var userPrincipal = await userManager.GetUserAsync(user);
            return new AdminDTO {
                                 Id = userPrincipal.Id,
                                 userName = userPrincipal.UserName,
                                 Token = await jwtTokenService.GetToken(userPrincipal, System.TimeSpan.FromMinutes(100)),
                                 Roles = await userManager.GetRolesAsync(userPrincipal)
            };
        }
    }
}
