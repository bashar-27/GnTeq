using GnTeq.Models.DTO;
using System.Security.Claims;

namespace GnTeq.Models.Interface
{
    public interface IAdmin
    {
        public Task<AdminDTO>Authenticate(string username, string password);
        public Task<AdminDTO> GetUser(ClaimsPrincipal user);
    }
}
