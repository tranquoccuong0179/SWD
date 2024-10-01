using SWD392.Manim.Repositories;
using Microsoft.AspNetCore.Mvc;
using SWD392.Manim.Repositories.ViewModel.TopicVM;
using SWD392.Manim.Services.Services;

namespace SWD392.Manim.API.Controllers
{
    [Route("api/topics")]
    [ApiController]
    public class TopicsController(ITopicService topicService) : ControllerBase
    {
        public readonly ITopicService _topicService = topicService;

        [HttpGet]
        public async Task<IActionResult> GetTopics(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _topicService.GetTopics(index, pageSize, id, nameSearch);
            return Ok(new BaseResponseModel<PaginatedList<GetTopicsVM>?>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTopicById(string id)
        {
            var result = await _topicService.GetTopicById(id);
            return Ok(new BaseResponseModel<GetTopicsVM>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: result));
        }
        [HttpPost]
        public async Task<IActionResult> PostTopic(PostTopicVM model)
        {
            await _topicService.PostTopic(model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Thêm thành công"));
        }
        [HttpPut]
        public async Task<IActionResult> PutTopic(string id, PostTopicVM model)
        {
            await _topicService.PutTopic(id, model);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Chỉnh sửa thành công"));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(string id)
        {
            await _topicService.DeleteTopic(id);
            return Ok(new BaseResponseModel<string>(
                statusCode: StatusCodes.Status200OK,
                code: ResponseCodeConstants.SUCCESS,
                data: "Xoa thành công"));
        }
    }
}
