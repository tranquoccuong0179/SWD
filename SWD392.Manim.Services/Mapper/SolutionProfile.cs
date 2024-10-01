using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.SolutionVM;

namespace SWD392.Manim.Services.Mapper
{
    public class SolutionProfile : Profile
    {
        public SolutionProfile()
        {
            CreateMap<Solution, GetSolutionsVM>().ReverseMap();
            CreateMap<Solution, PostSolutionVM>().ReverseMap();
        }
    }
}
