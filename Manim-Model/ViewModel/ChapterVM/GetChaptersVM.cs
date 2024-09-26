using Manim_Model.ViewModel.TopicVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.ViewModel.ChapterVM
{
    public class GetChaptersVM
    {
        public string Id { get; set; } = string.Empty;
        public string SubjectId { get; set; } = string.Empty;
        public string SubjectName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public bool Status { get; set; } = true;
        public IEnumerable<GetTopicNamesVM>? Topics { get; set; }
    }
}
