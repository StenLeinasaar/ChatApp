using System;
namespace ChatApp.Dtos {

    public class Event{

        public Guid Id {get;set;}
        public string title {get;set;}
        public string description {get;set;}
        public string imgUrl {get;set;}
        public string date {get;set;}
        public string instructor {get;set;}
        public string location {get;set;}
        public string type {get;set;}
        public string cost {get;set;}
        public long value {get;set;}
    }
}