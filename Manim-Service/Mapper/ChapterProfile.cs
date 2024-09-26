using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.UserVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Mapper
{
    public class ChapterProfile : Profile
    {
        public ChapterProfile()
        {
            CreateMap<Chapter, GetChaptersVM>().ReverseMap();
            CreateMap<Chapter, GetChapterNamesVM>().ReverseMap();
            CreateMap<Chapter, PostChapterVM>().ReverseMap();
        }
    }
}
