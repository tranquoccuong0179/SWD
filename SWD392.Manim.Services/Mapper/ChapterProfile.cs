using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.ChapterVM;

namespace SWD392.Manim.Services.Mapper
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
