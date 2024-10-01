namespace SWD392.Manim.Repositories.ViewModel.AuthVM
{
    public class GoogleAuthVM
    {
        public string Email { get; set; } = string.Empty;
        public string? Name { get; set; }
        public GetTokenVM? Token { get; set; }
        //public GetTokenVM Token { get; set; } = new GetTokenVM();
    }
}
