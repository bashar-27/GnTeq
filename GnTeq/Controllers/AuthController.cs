
using GnTeq.Models;
using GnTeq.Models.DTO;
using GnTeq.Models.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;

using System;
using System.Threading.Tasks;

namespace GnTeq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin _user;
        private readonly SignInManager<AppUser> _signInManager;
        public AdminController(IAdmin user, SignInManager<AppUser> signInManager)
        {
            _user = user;
            _signInManager = signInManager;
        }


        /// <summary>
        /// Authenticate a user and perform login.
        /// </summary>
        /// <param name="loginDto">Login credentials.</param>
        [HttpPost("Login")]
        public async Task<ActionResult<AdminDTO>> Login(Login loginDto)
        {
            var user = await _user.Authenticate(loginDto.Username, loginDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            return user;
        }

        /// <summary>
        /// Get the profile information of the currently authenticated user.
        /// </summary>
        [HttpGet("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logged Out");
        }


    }
}