using Manim_Model.Entity;
using Manim_Model.ViewModel.ChapterVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.ViewModel.SubjectVM
{
    public class GetSubjectsVM
    {   
        public string Id {  get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool Status { get; set; } = true;
        public IEnumerable<GetChapterNamesVM>? Chapters { get; set; }

    }
}
