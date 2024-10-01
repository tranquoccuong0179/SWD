using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.ParameterVM;

namespace SWD392.Manim.Services.Mapper
{
    public class ParameterProfile : Profile
    {
        public ParameterProfile()
        {
            CreateMap<Parameter, GetParametersVM>().ReverseMap();
            CreateMap<Parameter, PostParameterVM>().ReverseMap();
        }
    }
}
