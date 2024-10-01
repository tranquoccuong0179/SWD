using SWD392.Manim.Repositories.ViewModel.UserVM;

namespace SWD392.Manim.Repositories.ViewModel.AuthVM
{
    public class GetSignInVM
    {
        public GetUserVM User { get; set; } = new GetUserVM();
        public GetTokenVM Token { get; set; } = new GetTokenVM();
    }
}
