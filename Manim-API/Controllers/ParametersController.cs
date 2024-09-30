using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Model.ViewModel.ParameterVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/parameter")]
    [ApiController]
    public class ParametersController(IParameterService parameterService) : ControllerBase
    {
        public readonly IParameterService _parameterService = parameterService;

        [HttpGet]
        public async Task<IActionResult> GetParameters(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _parameterService.GetParameters(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetParametersVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetParameterById(string id)
        {
            var result = await _parameterService.GetParameterById(id);
            return Ok(new BaseResponseModel<GetParametersVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostParameter(PostParameterVM model)
        {
            await _parameterService.PostParameter(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutParameter(string id, PostParameterVM model)
        {
            await _parameterService.PutParameter(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParameter(string id)
        {
            await _parameterService.DeleteParameter(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xóa thành công"));
        }
    }
}
