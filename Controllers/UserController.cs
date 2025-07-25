using JwtApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace JwtApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static readonly List<string> Contents = new List<string> { };

        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetUsers()
        {
            var currentUser = GetCurrentUser();
            var users = UserConstants.Users.Select(u => new
            {
                u.Username,
                u.Role,
                u.EmailAddress
            }).ToList();
            return Ok(users);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Editor")]
        public IActionResult AddContent([FromBody] ContentRequest request)
        {
            var currentUser = GetCurrentUser();
            Contents.Add(request.Content);
            return Ok(Contents);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Editor,Viewer")]
        public IActionResult GetContents()
        {
            return Ok(Contents);
        }
        private UserModel GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;

                return new UserModel
                {
                    Username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value,
                    EmailAddress = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value
                };
            }
            return null;
        }
    }
    public record ContentRequest(string Content);
}

