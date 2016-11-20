using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace WebAPIApplication.DataAccess
{
    [BsonIgnoreExtraElements]
    public class Book
    {
        public ObjectId Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }
        
        [BsonElement("author")]
        public string Author { get; set; }
        
        [BsonElement("isbn")]
        public string Isbn { get; set; }
    }
}