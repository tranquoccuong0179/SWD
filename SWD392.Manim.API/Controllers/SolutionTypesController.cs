using SWD392.Manim.Repositories;
using Microsoft.AspNetCore.Mvc;
using SWD392.Manim.Repositories.ViewModel.SolutionTypeVM;
using SWD392.Manim.Services.Services;

namespace SWD392.Manim.API.Controllers
{
    [Route("api/solution_types")]
    [ApiController]
    public class SolutionTypesController(ISolutionTypeService solutionTypeService) : ControllerBase
    {
        public readonly ISolutionTypeService _solutionTypeService = solutionTypeService;

        [HttpGet]
        public async Task<IActionResult> GetSolutionTypes(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _solutionTypeService.GetSolutionTypes(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetSolutionTypesVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSolutionTypeById(string id)
        {
            var result = await _solutionTypeService.GetSolutionTypeById(id);
            return Ok(new BaseResponseModel<GetSolutionTypesVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostSolutionType(PostSolutionTypeVM model)
        {
            await _solutionTypeService.PostSolutionType(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutSolutionType(string id, PostSolutionTypeVM model)
        {
            await _solutionTypeService.PutSolutionType(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolutionType(string id)
        {
            await _solutionTypeService.DeleteSolutionType(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
