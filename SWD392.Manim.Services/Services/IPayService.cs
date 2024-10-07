using Net.payOS.Types;

namespace SWD392.Manim.Services.Services
{
    public interface IPayService
    {
        Task<CreatePaymentResult> CreatePaymentUrlRegisterCreator(decimal balance, Guid id);
    }
}
