using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.UserVM;

namespace SWD392.Manim.Services.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ApplicationUser, GetUserVM>().ReverseMap();
        }
    }
}
