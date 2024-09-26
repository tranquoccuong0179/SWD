using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ProblemTypeVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Manim_Service.Services
{
    public class ProblemTypeService : IProblemTypeService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public ProblemTypeService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<PaginatedList<GetProblemTypesVM>?> GetProblemTypes(int index, int pageSize, string? id, string? nameSearch)
        {
            IQueryable<ProblemType> query = _unitOfWork.GetRepository<ProblemType>().Entities.Where(s => !s.DeletedAt.HasValue);

            if (!string.IsNullOrWhiteSpace(id))
            {
                query = query.Where(lp => lp.Id.ToString().Contains(id));
            }

            if (!string.IsNullOrWhiteSpace(nameSearch))
            {
                query = query.Where(lp => lp.Name.Contains(nameSearch));
            }

            var resultQuery = await _unitOfWork.GetRepository<ProblemType>().GetPagging(query, index, pageSize);

            var responseItems = resultQuery.Items.Select(item => _mapper.Map<GetProblemTypesVM>(item)).ToList();

            // Create paginated response
            var responsePaginatedList = new PaginatedList<GetProblemTypesVM>(
                responseItems,
                resultQuery.TotalCount,
                resultQuery.PageNumber,
                resultQuery.TotalPages
            );
            return responsePaginatedList;
        }


        public async Task PostProblemType(PostProblemTypeVM model)
        {
            ProblemType? existedProblemType = await _unitOfWork.GetRepository<ProblemType>().Entities.Where(s => s.Name == model.Name).FirstOrDefaultAsync();
            if (existedProblemType != null)
            {
                throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Tên vấn đề đã tồn tại!");
            }
            ProblemType problemType = _mapper.Map<ProblemType>(model);
            problemType.CreatedAt = DateTime.Now;

            await _unitOfWork.GetRepository<ProblemType>().InsertAsync(problemType);
            await _unitOfWork.CommitAsync();
        }

        public async Task PutProblemType(string id, PostProblemTypeVM model)
        {
            ProblemType? existedProblemType = await _unitOfWork.GetRepository<ProblemType>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Vấn đề không tồn tại!");

            _mapper.Map(model, existedProblemType);
            existedProblemType.UpdatedAt = DateTime.Now;
            await _unitOfWork.GetRepository<ProblemType>().UpdateAsync(existedProblemType);
            await _unitOfWork.CommitAsync();
        }
        public async Task DeleteProblemType(string id)
        {
            ProblemType? existedProblemType = await _unitOfWork.GetRepository<ProblemType>().GetByIdAsync(id) ?? throw new ErrorException(StatusCodes.Status404NotFound, ErrorCode.NotFound, "Vấn đề không tồn tại!");
            existedProblemType.DeletedAt = DateTime.Now;
            await _unitOfWork.GetRepository<ProblemType>().UpdateAsync(existedProblemType);
            await _unitOfWork.CommitAsync();
        }
    }
}
