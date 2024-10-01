namespace SWD392.Manim.Repositories.ViewModel.UserVM
{
    public class GetUserVM
    {
        public string Id { get; set; } = string.Empty;
        public string? UserName { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public long? Gender { get; set; }
    }
}
