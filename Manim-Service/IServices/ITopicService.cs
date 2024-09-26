using Manim_Model.ViewModel.TopicVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Service.IServices
{
    public interface ITopicService
    {
        Task DeleteTopic(string id);
        Task<GetTopicsVM?> GetTopics();
        Task PostTopic(PostTopicVM model);
        Task PutTopic(string id, PostTopicVM model);
    }
}
