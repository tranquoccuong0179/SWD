using Manim_Model.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.Entity
{
    public class Parameter : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public double Value { get; set; }
    }
}
