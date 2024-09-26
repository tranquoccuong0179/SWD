using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.SubjectVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/[controller]")]
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
        [HttpDelete]
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
