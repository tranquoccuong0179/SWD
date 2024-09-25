using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Subject : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool Status { get; set; } = true;
    public virtual ICollection<Chapter> Chapters { get; set; } = new List<Chapter>();
}
