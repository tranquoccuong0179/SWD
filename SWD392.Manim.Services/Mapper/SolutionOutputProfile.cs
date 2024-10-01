using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.SolutionOutputVM;

namespace SWD392.Manim.Services.Mapper
{
    public class SolutionOutputProfile : Profile
    {
        public SolutionOutputProfile()
        {
            CreateMap<SolutionOutput, GetSolutionOutputsVM>().ReverseMap();
            CreateMap<SolutionOutput, PostSolutionOutputVM>().ReverseMap();
        }
    }
}
