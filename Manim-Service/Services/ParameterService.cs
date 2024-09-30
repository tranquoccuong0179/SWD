using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.ParameterVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Manim_Service.Services
{
    public class ParameterService : IParameterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ParameterService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<PaginatedList<GetParametersVM>?> GetParameters(int index, int pageSize, string? id, string? nameSearch)
        {
            IQueryable<Parameter> query = _unitOfWork.GetRepository<Parameter>().Entities.Where(s => !s.DeletedAt.HasValue);

            if (!string.IsNullOrWhiteSpace(id))
            {
                query = query.Where(lp => lp.Id.ToString().Contains(id));
            }

            if (!string.IsNullOrWhiteSpace(nameSearch))
            {
                query = query.Where(lp => lp.Name.Contains(nameSearch));
            }

            var resultQuery = await _unitOfWork.GetRepository<Parameter>().GetPagging(query, index, pageSize);

            var responseItems = resultQuery.Items.Select(item => _mapper.Map<GetParametersVM>(item)).ToList();

            // Create paginated response
            var responsePaginatedList = new PaginatedList<GetParametersVM>(
                responseItems,
                resultQuery.TotalCount,
                resultQuery.PageNumber,
                resultQuery.TotalPages
            );
            return responsePaginatedList;
        }
        public async Task<GetParametersVM?> GetParameterById(string id)
        {
            Parameter? existedParam = await _unitOfWork.GetRepository<Parameter>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Biến không tồn tại!");
            return _mapper.Map<GetParametersVM?>(existedParam);
        }
        public async Task PostParameter(PostParameterVM model)
        {
            Parameter? existedParameter = await _unitOfWork.GetRepository<Parameter>().Entities.Where(p => !p.DeletedAt.HasValue && p.Name == model.Name).FirstOrDefaultAsync();
            if (existedParameter != null)
            {
                throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Tên biến đã tồn tại");
            }
            Parameter parameter = _mapper.Map<Parameter>(model);
            await _unitOfWork.GetRepository<Parameter>().InsertAsync(parameter);
            await _unitOfWork.CommitAsync();
        }

        public async Task PutParameter(string id, PostParameterVM model)
        {
            Parameter? existedParameter = await _unitOfWork.GetRepository<Parameter>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Biến không tồn tại!");
            Parameter? existedParameterName = await _unitOfWork.GetRepository<Parameter>().Entities.Where(p => !p.DeletedAt.HasValue && p.Name == model.Name).FirstOrDefaultAsync();
            if (existedParameterName != null)
            {
                throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Tên biến đã tồn tại");
            }
            _mapper.Map(model, existedParameter);
            existedParameter.UpdatedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Parameter>().UpdateAsync(existedParameter);
            await _unitOfWork.CommitAsync();
        }
        public async Task DeleteParameter(string id)
        {
            Parameter? existedParameter = await _unitOfWork.GetRepository<Parameter>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Biến không tồn tại!");
            existedParameter.DeletedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Parameter>().UpdateAsync(existedParameter);
            await _unitOfWork.CommitAsync();
        }


    }
}
