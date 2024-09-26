using AutoMapper;
using Manim_Model.ViewModel.ProblemTypeVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public Task DeleteProblemType(string id)
        {
            throw new NotImplementedException();
        }

        public Task<GetProblemTypesVM?> GetProblemTypes()
        {
            throw new NotImplementedException();
        }

        public Task PostProblemType(PostProblemTypeVM model)
        {
            throw new NotImplementedException();
        }

        public Task PutProblemType(string id, PostProblemTypeVM model)
        {
            throw new NotImplementedException();
        }
    }
}
