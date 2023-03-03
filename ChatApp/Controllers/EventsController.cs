using System;
using System.Threading.Tasks;
using ChatApp.Data;
using ChatApp.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Controllers{


    [ApiController]
    [Route("api/[controller]")]
    public class EventsController :Controller{

        private readonly ChatAppDbContext _chatAppDbContext;

        public Guid Guid { get; private set; }

        public EventsController(ChatAppDbContext chatAppDbContext)
        {
            _chatAppDbContext = chatAppDbContext;
        }

        // Get all events
        [HttpGet]
        public async Task <IActionResult> GetAllEvents(){

            var events = await _chatAppDbContext.Events.ToListAsync();
            
            return Ok(events);
        }


        // Add an event
        [HttpPost]
        public async Task <IActionResult> AddEvent([FromBody] Event eventRequest){
            eventRequest.Id= Guid.NewGuid();
            await _chatAppDbContext.Events.AddAsync(eventRequest);

            await _chatAppDbContext.SaveChangesAsync();

            return Ok(eventRequest);

        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEvent([FromRoute]Guid id){
            var ev = await _chatAppDbContext.Events.FirstOrDefaultAsync(x => x.Id == id);
        
            if(ev == null ){
                return NotFound();
            }

            return Ok(ev);
    }


        [HttpPut]
        public async Task<IActionResult> UpdateEvent(UserEventRelation toAdd){
            var even = await _chatAppDbContext.Events.FindAsync(toAdd.EventId);

            if(even == null){
                return NotFound();

            }

            await _chatAppDbContext.UsersEvents.AddAsync(toAdd);
            await _chatAppDbContext.SaveChangesAsync();

            return Ok();
        }
}
}