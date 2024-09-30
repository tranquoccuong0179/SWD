using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.SolutionVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/solutions")]
    [ApiController]
    public class SolutionsController(ISolutionService solutionService) : ControllerBase
    {
        public readonly ISolutionService _solutionService = solutionService;

        [HttpGet]
        public async Task<IActionResult> GetSolutions(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _solutionService.GetSolutions(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetSolutionsVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSolutionById(string id)
        {
            var result = await _solutionService.GetSolutionById(id);
            return Ok(new BaseResponseModel<GetSolutionsVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostSolution(PostSolutionVM model)
        {
            await _solutionService.PostSolution(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutSolution(string id, PostSolutionVM model)
        {
            await _solutionService.PutSolution(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolution(string id)
        {
            await _solutionService.DeleteSolution(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
