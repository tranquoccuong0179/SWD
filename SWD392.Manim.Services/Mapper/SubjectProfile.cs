using AutoMapper;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.SubjectVM;

namespace SWD392.Manim.Services.Mapper
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
