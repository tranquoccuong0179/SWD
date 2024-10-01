using AutoMapper;
using SWD392.Manim.Repositories.Repository.Interface;
using Microsoft.AspNetCore.Http;
using SWD392.Manim.Repositories.Entity;
using SWD392.Manim.Repositories.ViewModel.ChapterVM;
using SWD392.Manim.Repositories.ViewModel.TopicVM;
using SWD392.Manim.Services.Services;
using SWD392.Manim.Repositories;
using Microsoft.EntityFrameworkCore;


namespace SWD392.Manim.Services.Services
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
        public async Task<PaginatedList<GetChaptersVM>?> GetChapters(int index, int pageSize, string? id, string? nameSearch)
        {
            IQueryable<Chapter> query = _unitOfWork.GetRepository<Chapter>().Entities.Where(s => !s.DeletedAt.HasValue);

            if (!string.IsNullOrWhiteSpace(id))
            {
                query = query.Where(lp => lp.Id.ToString().Contains(id));
            }

            if (!string.IsNullOrWhiteSpace(nameSearch))
            {
                query = query.Where(lp => lp.Name.Contains(nameSearch));
            }

            var resultQuery = await _unitOfWork.GetRepository<Chapter>().GetPagging(query, index, pageSize);

            var responseItems = resultQuery.Items.Select(item =>
            {
                IEnumerable<GetTopicNamesVM> topicNames = item.Topics
                    .Select(ch => new GetTopicNamesVM { Id = ch.Id, Name = ch.Name })
                    .ToList();
                var result = _mapper.Map<GetChaptersVM>(item);
                result.Topics = topicNames;
                return result;
            }).ToList();

            // Create paginated response
            var responsePaginatedList = new PaginatedList<GetChaptersVM>(
                responseItems,
                resultQuery.TotalCount,
                resultQuery.PageNumber,
                resultQuery.TotalPages
            );
            return responsePaginatedList;
        }
        public async Task<GetChaptersVM?> GetChapterById(string id)
        {
            Chapter? existedChapter = await _unitOfWork.GetRepository<Chapter>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Chương không tồn tại!");
            return _mapper.Map<GetChaptersVM?>(existedChapter);
        }

        public async Task PostChapter(PostChapterVM model)
        {
            Chapter? existedChapter = await _unitOfWork.GetRepository<Chapter>().Entities.Where(s => s.Name == model.Name).FirstOrDefaultAsync();
            if (existedChapter != null)
            {
                throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Tên chương đã tồn tại!");
            }
            Chapter chapter = _mapper.Map<Chapter>(model);
            chapter.CreatedAt = DateTime.Now;

            await _unitOfWork.GetRepository<Chapter>().InsertAsync(chapter);
            await _unitOfWork.CommitAsync();
        }

        public async Task PutChapter(string id, PostChapterVM model)
        {
            Chapter? existedChapter = await _unitOfWork.GetRepository<Chapter>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Chương không tồn tại!");

            _mapper.Map(model, existedChapter);
            existedChapter.UpdatedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Chapter>().UpdateAsync(existedChapter);
            await _unitOfWork.CommitAsync();
        }
        public async Task DeleteChapter(string id)
        {
            Chapter? existedChapter = await _unitOfWork.GetRepository<Chapter>().GetByIdAsync(id) ?? throw new ErrorException(StatusCodes.Status404NotFound, ErrorCode.NotFound, "Chương không tồn tại!");
            existedChapter.DeletedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Chapter>().UpdateAsync(existedChapter);
            await _unitOfWork.CommitAsync();
        }


    }
}
