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
        public virtual ICollection<SolutionOutput> SolutionOutputs { get; set; } = new List<SolutionOutput>();
        public virtual ICollection<Parameter> Parameters { get; set; } = new List<Parameter>();
    }
}
