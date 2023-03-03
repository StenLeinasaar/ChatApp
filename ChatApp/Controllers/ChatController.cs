using ChatApp.Service;
using ChatApp.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ChatApp.Controllers{

    [Route("api/[Controller]")]
    [ApiController]

    public class ChatController : ControllerBase{
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService){
            _chatService = chatService;

        }

        [HttpPost("register-user")]

        public IActionResult RegisterUser(ChatUser model){
            if(_chatService.AddUserToList(model.Name)){
                //204 status code
                return NoContent();
            }

            return BadRequest("This name is taken, please choose another name");
        }

    }


}