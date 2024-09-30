using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.SolutionTypeVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;

namespace Manim_Service.Services
{
    public class SolutionTypeService : ISolutionTypeService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public SolutionTypeService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public Task<PaginatedList<GetSolutionTypesVM>?> GetSolutionTypes(int index, int pageSize, string? id, string? nameSearch)
        {
            throw new NotImplementedException();
        }

        public Task PostSolutionType(PostSolutionTypeVM model)
        {
            throw new NotImplementedException();
        }

        public Task PutSolutionType(string id, PostSolutionTypeVM model)
        {
            throw new NotImplementedException();
        }
        public Task DeleteSolutionType(string id)
        {
            throw new NotImplementedException();
        }
    }
}
