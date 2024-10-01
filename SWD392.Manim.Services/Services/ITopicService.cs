using SWD392.Manim.Repositories;
using SWD392.Manim.Repositories.ViewModel.TopicVM;

namespace SWD392.Manim.Services.Services
{
    public interface ITopicService
    {
        Task DeleteTopic(string id);
        Task<GetTopicsVM?> GetTopicById(string id);
        Task<PaginatedList<GetTopicsVM>?> GetTopics(int index, int pageSize, string? id, string? nameSearch);
        Task PostTopic(PostTopicVM model);
        Task PutTopic(string id, PostTopicVM model);
    }
}
