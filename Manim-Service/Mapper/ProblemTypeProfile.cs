using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ProblemTypeVM;

namespace Manim_Service.Mapper
{
    public class ProblemTypeProfile : Profile
    {
        public ProblemTypeProfile()
        {
            CreateMap<ProblemType, GetProblemTypesVM>().ReverseMap();
            CreateMap<ProblemType, GetProblemTypeNamesVM>().ReverseMap();
            CreateMap<ProblemType, PostProblemTypeVM>().ReverseMap();
        }
    }
}
