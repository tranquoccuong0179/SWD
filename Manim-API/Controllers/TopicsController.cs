using Manim_Core.Infrastructure;
using Manim_Model.ViewModel.TopicVM;
using Manim_Service.IServices;
using Manim_Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Manim_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController(ITopicService topicService) : ControllerBase
    {
        public readonly ITopicService _topicService = topicService;

        [HttpGet]
        public async Task<IActionResult> GetTopics(int index = 1, int pageSize = 10, string? id = null, string? nameSearch = null)
        {
            var result = await _topicService.GetTopics();
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
        [HttpDelete]
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
