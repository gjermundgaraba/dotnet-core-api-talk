using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Collections.Generic;
 
namespace WebAPIApplication.DataAccess
{
    public class BookRepository : IBookRepository
    {
        MongoClient _client;
        MongoServer _server;
        MongoDatabase _db;
 
        public BookRepository()
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _server = _client.GetServer();
            _db = _server.GetDatabase("BookDB");      
        }
 
        public IEnumerable<Book> GetBooks()
        {
            return _db.GetCollection<Book>("books").FindAll();
        }
 
 
        public Book GetBook(string id)
        {
            ObjectId objectId = new ObjectId(id);
            var res = Query<Book>.EQ(p => p.Id, objectId);
            return _db.GetCollection<Book>("books").FindOne(res);
        }
 
        public Book Create(Book p)
        {
            _db.GetCollection<Book>("books").Save(p);
            return p;
        }
 
        public void Update(string id,Book p)
        {
            ObjectId objectId = new ObjectId(id);
            p.Id = objectId;
            var res = Query<Book>.EQ(pd => pd.Id, objectId);
            var operation = Update<Book>.Replace(p);
            _db.GetCollection<Book>("books").Update(res, operation);
        }
        public void Remove(string id)
        {
            ObjectId objectId = new ObjectId(id);
            var res = Query<Book>.EQ(e => e.Id, objectId);
            var operation = _db.GetCollection<Book>("books").Remove(res);
        }
    }
}