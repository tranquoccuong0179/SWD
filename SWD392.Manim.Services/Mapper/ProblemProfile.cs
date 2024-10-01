using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.ProblemVM;

namespace SWD392.Manim.Services.Mapper
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
