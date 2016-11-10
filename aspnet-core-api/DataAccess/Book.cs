using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace WebAPIApplication.DataAccess
{
    [BsonIgnoreExtraElements]
    public class Book
    {
        public ObjectId Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; }
        
        [BsonElement("Author")]
        public string author { get; set; }
        
        [BsonElement("isbn")]
        public string isbn { get; set; }
    }
}