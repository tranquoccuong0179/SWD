using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.SolutionTypeVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Mapper
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
