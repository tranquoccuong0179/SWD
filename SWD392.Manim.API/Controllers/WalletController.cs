using Microsoft.AspNetCore.Mvc;
using SWD392.Manim.Services.Services;

namespace SWD392.Manim.API.Controllers
{
    [Route("api/wallet")]
    [ApiController]
    public class WalletController(IPayService payService) : ControllerBase
    {
        private readonly IPayService _payService = payService;

        [HttpPost("/create")]
        public async Task<IActionResult> CreatePaymentUrl([FromQuery] decimal balance, Guid id)
        {
            try
            {
                var result = await _payService.CreatePaymentUrlRegisterCreator(balance, id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Problem("Thất bại");
            }
        }
    }
}
