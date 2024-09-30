using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ParameterVM;
using Manim_Model.ViewModel.ProblemVM;
using Manim_Model.ViewModel.TopicVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


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
        public async Task<PaginatedList<GetTopicsVM>?> GetTopics(int index, int pageSize, string? id, string? nameSearch)
        {
            IQueryable<Topic> query = _unitOfWork.GetRepository<Topic>().Entities.Where(s => !s.DeletedAt.HasValue);

            if (!string.IsNullOrWhiteSpace(id))
            {
                query = query.Where(lp => lp.Id.ToString().Contains(id));
            }

            if (!string.IsNullOrWhiteSpace(nameSearch))
            {
                //query = query.Where(lp => lp.Name.Contains(nameSearch));
            }

            var resultQuery = await _unitOfWork.GetRepository<Topic>().GetPagging(query, index, pageSize);

            var responseItems = resultQuery.Items.Select(item => {
                IEnumerable<GetProblemNamesVM> ptNames = item.Problems
                    .Select(ch => new GetProblemNamesVM { Id = ch.Id, Name = ch.Name })
                    .ToList();
                var result = _mapper.Map<GetTopicsVM>(item);
                result.Problems = ptNames;
                return result;
            }).ToList();
            // Create paginated response
            var responsePaginatedList = new PaginatedList<GetTopicsVM>(
                responseItems,
                resultQuery.TotalCount,
                resultQuery.PageNumber,
                resultQuery.TotalPages
            );
            return responsePaginatedList;
        }

        public async Task<GetTopicsVM?> GetTopicById(string id)
        {
            Topic? existedParam = await _unitOfWork.GetRepository<Topic>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Chủ đề không tồn tại!");
            return _mapper.Map<GetTopicsVM?>(existedParam);
        }
        public async Task PostTopic(PostTopicVM model)
        {
            //Topic? existedTopic = await _unitOfWork.GetRepository<Topic>().Entities.Where(s => s.Name == model.Name).FirstOrDefaultAsync();
            //if (existedTopic != null)
            //{
            //    throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Tên chủ đề đã tồn tại!");
            //}
            Topic topic = _mapper.Map<Topic>(model);
            topic.CreatedAt = DateTime.Now;

            await _unitOfWork.GetRepository<Topic>().InsertAsync(topic);
            await _unitOfWork.CommitAsync();
        }

        public async Task PutTopic(string id, PostTopicVM model)
        {
            Topic? existedTopic = await _unitOfWork.GetRepository<Topic>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Chủ đề không tồn tại!");

            _mapper.Map(model, existedTopic);
            existedTopic.UpdatedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Topic>().UpdateAsync(existedTopic);
            await _unitOfWork.CommitAsync();
        }
        public async Task DeleteTopic(string id)
        {
            Topic? existedTopic = await _unitOfWork.GetRepository<Topic>().GetByIdAsync(id) ?? throw new ErrorException(StatusCodes.Status404NotFound, ErrorCode.NotFound, "Chủ đề không tồn tại!");
            existedTopic.DeletedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Topic>().UpdateAsync(existedTopic);
            await _unitOfWork.CommitAsync();
        }
    }
}
