using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Subject
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public bool? Status { get; set; }

    public string? Createdby { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<Chapter> Chapters { get; set; } = new List<Chapter>();
}
