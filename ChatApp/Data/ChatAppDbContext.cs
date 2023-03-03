using ChatApp.Dtos;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Data{
    public class ChatAppDbContext: DbContext{

        public ChatAppDbContext(DbContextOptions options) : base(options){

        }


        // Creates a table with the property definitions from Dtos
        public DbSet<Event> Events { get; set; }

        public DbSet<User> Users {get;set;}

        public DbSet<UserEventRelation> UsersEvents {get;set;}

    }
}