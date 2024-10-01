using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.SolutionTypeVM;

namespace SWD392.Manim.Services.Mapper
{
    public class SolutionTypeProfile : Profile
    {
        public SolutionTypeProfile()
        {
            CreateMap<SolutionType, GetSolutionTypesVM>().ReverseMap();
            CreateMap<SolutionType, PostSolutionTypeVM>().ReverseMap();
        }
    }
}
