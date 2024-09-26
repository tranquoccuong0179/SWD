using AutoMapper;
using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.SubjectVM;
using Manim_Repository.Repository.Interface;
using Manim_Service.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Manim_Service.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly IMapper _mapper;
        private IUnitOfWork _unitOfWork;
        public SubjectService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<PaginatedList<GetSubjectsVM>?> GetSubjects(int index, int pageSize, string? id, string? nameSearch)
        {
            IQueryable<Subject> query = _unitOfWork.GetRepository<Subject>().Entities.Where(s => !s.DeletedAt.HasValue);

            if (!string.IsNullOrWhiteSpace(id))
            {
                query = query.Where(lp => lp.Id.ToString().Contains(id));
            }

            if (!string.IsNullOrWhiteSpace(nameSearch))
            {
                query = query.Where(lp => lp.Name.Contains(nameSearch));
            }

            var resultQuery = await _unitOfWork.GetRepository<Subject>().GetPagging(query, index, pageSize);

            var responseItems = resultQuery.Items.Select(item =>
            {
                IEnumerable<GetChapterNamesVM> chapterName = item.Chapters
                    .Select(ch => new GetChapterNamesVM { Id = ch.Id, Name = ch.Name })
                    .ToList();
                var result = _mapper.Map<GetSubjectsVM>(item);
                result.Chapters = chapterName;
                return result;
            }).ToList();

            // Create paginated response
            var responsePaginatedList = new PaginatedList<GetSubjectsVM>(
                responseItems,
                resultQuery.TotalCount,
                resultQuery.PageNumber,
                resultQuery.TotalPages
            );
            return responsePaginatedList;
        }


        public async Task PostSubject(PostSubjectVM model)
        {
            Subject? existedSubject = await _unitOfWork.GetRepository<Subject>().Entities.Where(s => s.Name == model.Name).FirstOrDefaultAsync();
            if (existedSubject != null) {
                throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Tên môn học đã tồn tại!");
            }
            Subject subject = _mapper.Map<Subject>(model);
            subject.CreatedAt = DateTime.Now;

            await _unitOfWork.GetRepository<Subject>().InsertAsync(subject);
            await _unitOfWork.CommitAsync();
        }

        public async Task PutSubject(string id, PostSubjectVM model)
        {
            Subject? existedSubject = await _unitOfWork.GetRepository<Subject>().Entities.Where(s => s.Id == id && !s.DeletedAt.HasValue).FirstOrDefaultAsync() ?? throw new ErrorException(StatusCodes.Status409Conflict, ErrorCode.Conflicted, "Môn học không tồn tại!");

            _mapper.Map(model, existedSubject);
            existedSubject.UpdatedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Subject>().UpdateAsync(existedSubject);
            await _unitOfWork.CommitAsync();
        }
        public async Task DeleteSubject(string id)
        {
            Subject? existedSubject = await _unitOfWork.GetRepository<Subject>().GetByIdAsync(id) ?? throw new ErrorException(StatusCodes.Status404NotFound, ErrorCode.NotFound, "Môn học không tồn tại!");
            existedSubject.DeletedAt = DateTime.Now;
            await _unitOfWork.GetRepository<Subject>().UpdateAsync(existedSubject);
            await _unitOfWork.CommitAsync();
        }
    }
}
