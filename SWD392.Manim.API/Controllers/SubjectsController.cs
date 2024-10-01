using SWD392.Manim.Repositories;
using Microsoft.AspNetCore.Mvc;
using SWD392.Manim.Repositories.ViewModel.SubjectVM;
using SWD392.Manim.Services.Services;

namespace SWD392.Manim.API.Controllers
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectsController(ISubjectService subjectService) : ControllerBase
    {
        public readonly ISubjectService _subjectService = subjectService;

        [HttpGet]
        public async Task<IActionResult> GetSubjects(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _subjectService.GetSubjects(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetSubjectsVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubjectById(string id)
        {
            var result = await _subjectService.GetSubjectById(id);
            return Ok(new BaseResponseModel<GetSubjectsVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostSubject(PostSubjectVM model)
        {
            await _subjectService.PostSubject(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutSubject(string id, PostSubjectVM model)
        {
            await _subjectService.PutSubject(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubject(string id)
        {
            await _subjectService.DeleteSubject(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
