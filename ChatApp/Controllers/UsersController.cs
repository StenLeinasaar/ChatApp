using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ChatApp.Data;
using ChatApp.Dtos;
using ChatApp.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ChatApp.Controllers{


    [ApiController]
    [Route("api/[controller]")]
    public class UsersController :Controller{

        private readonly ChatAppDbContext _chatAppDbContext;

        public UsersController(ChatAppDbContext chatAppDbContext)
        {
            _chatAppDbContext = chatAppDbContext;
        }

        [Authorize]
        [HttpGet]
        public async Task <ActionResult<User>> GetAllUsers(){
            return Ok(await _chatAppDbContext.Users.ToListAsync());
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObject){
            if(userObject == null){
                return BadRequest();
            }

            var toVerify = await _chatAppDbContext.Users.FirstOrDefaultAsync(x=> x.Username == userObject.Username);
            if(toVerify == null){
                return NotFound(new {Message = "Could not find the user. PLease register."});
            }

            if(!PasswordHasher.VerifyPassword(userObject.Password, toVerify.Password)){
                return NotFound(new {Message = "Wrong password"});
            }


            // Createa a JWT token
    
            toVerify.Token = CreateJwtToken(toVerify);

            return Ok(new {Message ="Login Succesful!", Token=toVerify.Token});


        }


        // Add an event
        [HttpPost("register")]
        public async Task <IActionResult> RegisterUser([FromBody] User userRequest){

            if(userRequest ==null){
                return BadRequest();
            }

            // Check username
            if(await UsernameExists(userRequest.Username)){
                return BadRequest(new {Message="Username is taken"});
            }

            // Check email

            if(await EmailExists(userRequest.Email)){
                return BadRequest(new {Message="Email is in use"});
            }

            userRequest.Id= Guid.NewGuid();
            userRequest.Role = "User";
            userRequest.Token = "";
            userRequest.Password = PasswordHasher.HashPassword(userRequest.Password);
            
            
            await _chatAppDbContext.Users.AddAsync(userRequest);
            await _chatAppDbContext.SaveChangesAsync();

            return Ok(new {Message= "User succesfully registered"});

        }

        private async Task<bool> UsernameExists(string username){
            return await _chatAppDbContext.Users.AnyAsync(x=> x.Username == username);
        }


        private async Task<bool> EmailExists(string email){
            return await _chatAppDbContext.Users.AnyAsync(x=> x.Email == email);
        }

        private string CreateJwtToken(User user){
            // Header, payload, and signature
            var JwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("supersecretkeysupersuper");
            var identity = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var token = JwtTokenHandler.CreateToken(tokenDescriptor);

            return JwtTokenHandler.WriteToken(token);
        }




        

        
    }
}