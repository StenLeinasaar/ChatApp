using System;
using System.Threading.Tasks;
using ChatApp.Dtos;
using ChatApp.Service;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp.Hubs{

    public class ChatHub: Hub{
        private readonly ChatService _chatService;
        public ChatHub(ChatService chatService){
            _chatService = chatService;
        }
        
        public override async Task OnConnectedAsync(){
            await Groups.AddToGroupAsync(Context.ConnectionId, "Come and chat");
            await Clients.Caller.SendAsync("UserConnected");
        }

        public override async Task OnDisconnectedAsync(Exception exception){
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Come and chat");
            var user = _chatService.GetUserByConnectionId(Context.ConnectionId);
            _chatService.RemoveUserFromList(user);
            await DisplayOnlineUsers();
            await base.OnDisconnectedAsync(exception);
        }

        public async Task AddUserConnectionId(string name){
            _chatService.AddUserConnectionId(name, Context.ConnectionId);
            await DisplayOnlineUsers();
        }

        public async Task RecieveMessage(MessageDto message){
            await Clients.Group("Come and chat").SendAsync("NewMessage", message);
        }

        public async Task CreatePrivateChat(MessageDto message){
            string privateGroupName = GetPrivateGroupName(message.From, message.To);
            await Groups.AddToGroupAsync(Context.ConnectionId, privateGroupName);
            var toConnectionId = _chatService.GetConnectionIdByUser(message.To);
            await Groups.AddToGroupAsync(toConnectionId, privateGroupName);
            // Opening private chatbox for the other end user
            await Clients.Client(toConnectionId).SendAsync("OpenPrivateChat", message);
        }

        public async Task RecievePrivateMessage(MessageDto message){
            string privateGroupName = GetPrivateGroupName(message.From, message.To);
            await Clients.Group(privateGroupName).SendAsync("NewPrivateMessage", message);

        }

        public async Task RemovePrivateChat(string from, string to){
            string privateGroupName = GetPrivateGroupName(from, to);
            await Clients.Group(privateGroupName).SendAsync("ClosePrivateChat");

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, privateGroupName);
            var toConnectionId = _chatService.GetConnectionIdByUser(to);
            await Groups.RemoveFromGroupAsync(toConnectionId,privateGroupName);
        }

        private async Task DisplayOnlineUsers(){
            var onlineUsers = _chatService.GetOnlineUsers();
            await Clients.Groups("Come and chat").SendAsync("OnlineUsers", onlineUsers);
        }

        private string GetPrivateGroupName(string from, string to){
            // from john to david --> david-john
            var stringCompare = string.CompareOrdinal(from,to) < 0;
            return stringCompare ? $"{from}-{to}" : $"{to}-{from}";
        }
    }
}