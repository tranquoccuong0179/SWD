using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.TopicVM;


namespace SWD392.Manim.Services.Mapper
{
    public class TopicProfile : Profile
    {
        public TopicProfile()
        {
            CreateMap<Topic, GetTopicsVM>().ReverseMap();
            CreateMap<Topic, PostTopicVM>().ReverseMap();
            CreateMap<Topic, GetTopicNamesVM>().ReverseMap();
        }
    }
}
