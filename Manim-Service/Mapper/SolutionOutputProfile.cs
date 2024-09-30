using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.SolutionOutputVM;

namespace Manim_Service.Mapper
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
