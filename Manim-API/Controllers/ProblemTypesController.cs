using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ProblemTypeVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemTypesController(IProblemTypeService problemTypeService) : ControllerBase
    {
        public readonly IProblemTypeService _problemTypeService = problemTypeService;

        [HttpGet]
        public async Task<IActionResult> GetProblemTypes(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _problemTypeService.GetProblemTypes(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetProblemTypesVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostProblemType(PostProblemTypeVM model)
        {
            await _problemTypeService.PostProblemType(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutProblemType(string id, PostProblemTypeVM model)
        {
            await _problemTypeService.PutProblemType(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteProblemType(string id)
        {
            await _problemTypeService.DeleteProblemType(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
