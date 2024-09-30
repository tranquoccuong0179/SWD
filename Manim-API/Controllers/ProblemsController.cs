using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.ProblemVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/problems")]
    [ApiController]
    public class ProblemsController(IProblemService problemService) : ControllerBase
    {
        public readonly IProblemService _problemService = problemService;

        [HttpGet]
        public async Task<IActionResult> GetProblems(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _problemService.GetProblems(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetProblemsVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProblemById(string id)
        {
            var result = await _problemService.GetProblemById(id);
            return Ok(new BaseResponseModel<GetProblemsVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostProblem(PostProblemVM model)
        {
            await _problemService.PostProblem(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutProblem(string id, PostProblemVM model)
        {
            await _problemService.PutProblem(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProblem(string id)
        {
            await _problemService.DeleteProblem(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
