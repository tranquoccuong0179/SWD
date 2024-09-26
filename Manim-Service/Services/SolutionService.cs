using AutoMapper;
using Manim_Model.ViewModel.SolutionVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Services
{
    public class SolutionService : ISolutionService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public SolutionService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public Task DeleteSolution(object model)
        {
            throw new NotImplementedException();
        }

        public Task<GetSolutionsVM?> GetSolutions()
        {
            throw new NotImplementedException();
        }

        public Task PostSolution(PostSolutionVM model)
        {
            throw new NotImplementedException();
        }

        public Task PutSolution(string id, PostSolutionVM model)
        {
            throw new NotImplementedException();
        }
    }
}
