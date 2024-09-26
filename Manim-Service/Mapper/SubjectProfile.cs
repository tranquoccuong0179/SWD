using AutoMapper;
using Manim_Model.Entity;
using Manim_Model.ViewModel.SubjectVM;

namespace Manim_Service.Mapper
{
    public class SubjectProfile : Profile
    {
        public SubjectProfile()
        {
            CreateMap<Subject, GetSubjectsVM>().ReverseMap();
            CreateMap<Subject, PostSubjectVM>().ReverseMap();
        }
    }
}
