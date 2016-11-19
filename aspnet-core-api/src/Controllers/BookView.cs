using System.ComponentModel.DataAnnotations;


namespace WebAPIApplication.Controllers
{
    public class BookView
    {
        public string Id { get; set; }

        [StringLength(60, MinimumLength = 3)]
        public string Title { get; set; }

        [StringLength(60, MinimumLength = 3)]
        public string author { get; set; }

        [RegularExpression(@"(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})")]
        public string isbn { get; set; }
    }
}