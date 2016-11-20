using Microsoft.AspNetCore.Mvc;

namespace WebAPIApplication.Controllers
{
    [Route("api/[controller]")]
    public class DemoController : Controller
    {
        [HttpGet]
        public string Get()
        {
            return "Demo is working, YAY!";
        }
    }
}
