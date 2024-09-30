using Manim_Core.Infrastructure;
using Manim_Model.Entity;
using Manim_Model.ViewModel.SolutionTypeVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
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
