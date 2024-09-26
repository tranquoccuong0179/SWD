using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.SolutionVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolutionsController(ISolutionService solutionService) : ControllerBase
    {
        public readonly ISolutionService _solutionService = solutionService;

        [HttpGet]
        public async Task<IActionResult> GetSolutions(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _solutionService.GetSolutions();
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
        [HttpDelete]
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
