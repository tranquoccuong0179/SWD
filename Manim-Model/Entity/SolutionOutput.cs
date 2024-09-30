using Manim_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.Entity
{
    public class SolutionOutput : BaseEntity
    {
        public string SolutionId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public virtual Solution? Solution { get; set; }

    }
}
