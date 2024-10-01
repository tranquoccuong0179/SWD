using SWD392.Manim.Repositories;
using Microsoft.AspNetCore.Mvc;
using SWD392.Manim.Repositories.ViewModel.ChapterVM;
using SWD392.Manim.Services.Services;

namespace SWD392.Manim.API.Controllers
{
    [Route("api/chapters")]
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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChapterById(string id)
        {
            var result = await _chapterService.GetChapterById(id);
            return Ok(new BaseResponseModel<GetChaptersVM>(
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
        [HttpDelete("{id}")]
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
