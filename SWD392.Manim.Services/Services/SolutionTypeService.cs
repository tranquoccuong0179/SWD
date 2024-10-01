using AutoMapper;
using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.Repository.Interface;
using SWD392.Manim.Repositories.ViewModel.SolutionTypeVM;
using SWD392.Manim.Services.Services;

namespace SWD392.Manim.Services.Services
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
        public Task<GetSolutionTypesVM?> GetSolutionTypeById(string id)
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
