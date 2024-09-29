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
        public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}
