using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.AuthVM;
using Manim_Model.ViewModel.ChapterVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChaptersController(IChapterService chapterService) : ControllerBase
    {
        public readonly IChapterService _chapterService = chapterService;

        [HttpGet]
        public async Task<IActionResult> GetChapters(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _chapterService.GetChapters(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetChaptersVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostChapter(PostChapterVM model)
        {
            await _chapterService.PostChapter(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutChapter(string id, PostChapterVM model)
        {
            await _chapterService.PutChapter(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteChapter(string id)
        {
            await _chapterService.DeleteChapter(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
