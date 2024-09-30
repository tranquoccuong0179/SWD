using Manim_Model.ViewModel.ProblemVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.ViewModel.TopicVM
{
    public class GetTopicsVM
    {
        public string Id { get; set; } = string.Empty;
        public string ChapterId { get; set; } = string.Empty;
        public string ChapterName { get; set; } = string.Empty;
        public long? Number { get; set; }
        public bool Status { get; set; } = true; 
        public IEnumerable<GetProblemNamesVM>? Problems { get; set; }

    }
}
