using AutoMapper;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Services
{
    public class ChapterService : IChapterService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public ChapterService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public Task DeleteChapter(object model)
        {
            throw new NotImplementedException();
        }

        public Task<GetChaptersVM?> GetChapters()
        {
            throw new NotImplementedException();
        }

        public Task PostChapter(PostChapterVM model)
        {
            throw new NotImplementedException();
        }

        public Task PutChapter(string id, PostChapterVM model)
        {
            throw new NotImplementedException();
        }
    }
}
