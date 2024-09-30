using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.SolutionOutputVM;
using Manim_Model.ViewModel.SolutionVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/solution_outputs")]
    [ApiController]
    public class SolutionOutputsController(ISolutionOutputService solutionOutputService) : ControllerBase
    {
        public readonly ISolutionOutputService _solutionOutputService = solutionOutputService;

        [HttpGet]
        public async Task<IActionResult> GetSolutions(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _solutionOutputService.GetSolutionOutputs(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetSolutionOutputsVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSolutionOutputById(string id)
        {
            var result = await _solutionOutputService.GetSolutionOutputById(id);
            return Ok(new BaseResponseModel<GetSolutionOutputsVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostSolutionOutput(PostSolutionOutputVM model)
        {
            await _solutionOutputService.PostSolutionOutput(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutSolutionOutput(string id, PostSolutionOutputVM model)
        {
            await _solutionOutputService.PutSolutionOutput(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolutionOutput(string id)
        {
            await _solutionOutputService.DeleteSolutionOutput(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
