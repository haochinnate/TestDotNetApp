using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using TestDotNetApp.API.Data;

namespace TestDotNetApp.API.Helpers
{
    public class LogCarModelActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var userId = int.Parse(resultContext.HttpContext.User
                .FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultContext.HttpContext.RequestServices.GetService<IMatchingRepository>();

            // var user = await repo.GetUser(userId);
            // user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}