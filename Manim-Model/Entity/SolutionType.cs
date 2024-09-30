using Manim_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.Entity
{
    public class SolutionType : BaseEntity
    {
        public string Name { get; set; } = string.Empty;    
        public string Description { get; set; } = string.Empty;
        public string ProblemId { get; set; } = string.Empty;
        public virtual Problem? Problem { get; set; }
        public virtual Solution? Solution { get; set; }

        public virtual ICollection<SolutionParameter> SolutionParameters { get; set; } = new List<SolutionParameter>();
    }
}
