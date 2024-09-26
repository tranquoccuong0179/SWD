using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.TopicVM;


namespace Manim_Service.Mapper
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
