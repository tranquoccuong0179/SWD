using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.SolutionOutputVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.Services
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


        public Task<PaginatedList<GetSolutionOutputsVM>?> GetSolutions(int index, int pageSize, string? id, string? nameSearch)
        {
            throw new NotImplementedException();
        }

        public Task PostSolution(PostSolutionOutputVM model)
        {
            throw new NotImplementedException();
        }

        public Task PutSolution(string id, PostSolutionOutputVM model)
        {
            throw new NotImplementedException();
        }
        public Task DeleteSolution(string id)
        {
            throw new NotImplementedException();
        }
    }
}
