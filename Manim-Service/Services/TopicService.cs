using AutoMapper;
using Manim_Model.ViewModel.TopicVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Services
{
    public class TopicService : ITopicService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public TopicService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public Task DeleteTopic(string id)
        {
            throw new NotImplementedException();
        }

        public Task<GetTopicsVM?> GetTopics()
        {
            throw new NotImplementedException();
        }

        public Task PostTopic(PostTopicVM model)
        {
            throw new NotImplementedException();
        }

        public Task PutTopic(string id, PostTopicVM model)
        {
            throw new NotImplementedException();
        }
    }
}
