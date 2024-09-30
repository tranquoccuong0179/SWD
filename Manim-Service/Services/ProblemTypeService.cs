using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ProblemVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Manim_Service.Services
{
    public class ProblemService : IProblemService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public ProblemService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<PaginatedList<GetProblemsVM>?> GetProblems(int index, int pageSize, string? id, string? nameSearch)
        {
            IQueryable<Problem> query = _unitOfWork.GetRepository<Problem>().Entities.Where(s => !s.DeletedAt.HasValue);

            if (!string.IsNullOrWhiteSpace(id))
            {
                query = query.Where(lp => lp.Id.ToString().Contains(id));
            }

            if (!string.IsNullOrWhiteSpace(nameSearch))
            {
                query = query.Where(lp => lp.Name.Contains(nameSearch));
            }

            var resultQuery = await _unitOfWork.GetRepository<Problem>().GetPagging(query, index, pageSize);

            var responseItems = resultQuery.Items.Select(item => _mapper.Map<GetProblemsVM>(item)).ToList();

            // Create paginated response
            var responsePaginatedList = new PaginatedList<GetProblemsVM>(
                responseItems,
                resultQuery.TotalCount,
                resultQuery.PageNumber,
                resultQuery.TotalPages
            );
            return responsePaginatedList;
        }


        public async Task PostProblem(PostProblemVM model)
        {
            Problem? existedProblem = await _unitOfWork.GetRepository<Problem>().Entities.Where(s => s.Name == model.Name).FirstOrDefaultAsync();
            if (existedProblem != null)
            {
                throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Tên vấn đề đã tồn tại!");
            }
            Problem problemType = _mapper.Map<Problem>(model);
            problemType.CreatedAt = DateTime.Now;

            await _unitOfWork.GetRepository<Problem>().InsertAsync(problemType);
            await _unitOfWork.CommitAsync();
        }

        public async Task PutProblem(string id, PostProblemVM model)
        {
            Problem? existedProblem = await _unitOfWork.GetRepository<Problem>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Vấn đề không tồn tại!");

            _mapper.Map(model, existedProblem);
            existedProblem.UpdatedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Problem>().UpdateAsync(existedProblem);
            await _unitOfWork.CommitAsync();
        }
        public async Task DeleteProblem(string id)
        {
            Problem? existedProblem = await _unitOfWork.GetRepository<Problem>().GetByIdAsync(id) ?? throw new ErrorException(StatusCodes.Status404NotFound, ErrorCode.NotFound, "Vấn đề không tồn tại!");
            existedProblem.DeletedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Problem>().UpdateAsync(existedProblem);
            await _unitOfWork.CommitAsync();
        }
    }
}
