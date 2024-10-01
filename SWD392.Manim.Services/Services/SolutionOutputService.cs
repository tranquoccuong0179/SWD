using AutoMapper;
using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.Repository.Interface;
using SWD392.Manim.Repositories.ViewModel.SolutionOutputVM;

namespace SWD392.Manim.Services.Services
{
    public class SolutionOutputService : ISolutionOutputService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public SolutionOutputService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        public Task<PaginatedList<GetSolutionOutputsVM>?> GetSolutionOutputs(int index, int pageSize, string? id, string? nameSearch)
        {
            throw new NotImplementedException();
        }
        public Task<GetSolutionOutputsVM?> GetSolutionOutputById(string id)
        {
            throw new NotImplementedException();
        }
        public Task PostSolutionOutput(PostSolutionOutputVM model)
        {
            throw new NotImplementedException();
        }

        public Task PutSolutionOutput(string id, PostSolutionOutputVM model)
        {
            throw new NotImplementedException();
        }
        public Task DeleteSolutionOutput(string id)
        {
            throw new NotImplementedException();
        }


    }
}
