using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.ParameterVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Mapper
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
        