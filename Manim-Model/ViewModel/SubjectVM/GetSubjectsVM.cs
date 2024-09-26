using Manim_Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.ViewModel.SubjectVM
{
    public class GetSubjectsVM
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool Status { get; set; } = true;
    }
}
