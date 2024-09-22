using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.Base
{
    public abstract class BaseEntity
    {
        protected BaseEntity()
        {
            Id = Guid.NewGuid().ToString("N");
            CreatedAt = UpdatedAt = DateTime.Now;
        }

        [Key]
        public string Id { get; set; } 
        public string? Createdby { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
