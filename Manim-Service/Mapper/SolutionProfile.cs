using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.SolutionVM;
using Manim_Model.ViewModel.UserVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Mapper
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
