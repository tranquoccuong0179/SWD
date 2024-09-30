using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ProblemVM;

namespace Manim_Service.Mapper
{
    public class ProblemProfile : Profile
    {
        public ProblemProfile()
        {
            CreateMap<Problem, GetProblemsVM>().ReverseMap();
            CreateMap<Problem, GetProblemNamesVM>().ReverseMap();
            CreateMap<Problem, PostProblemVM>().ReverseMap();
        }
    }
}
