namespace SWD392.Manim.Repositories.ViewModel.AuthVM
{
    public class PostSignUpVM
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string ConfirmPassword { get; set; }
        public required string FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public required long Gender { get; set; }
    }
}
