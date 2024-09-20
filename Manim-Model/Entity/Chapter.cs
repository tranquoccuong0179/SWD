using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Chapter
{
    public string Id { get; set; } = null!;

    public string? SubjectId { get; set; }

    public string? Name { get; set; }

    public bool? Status { get; set; }

    public string? Createby { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual Subject? Subject { get; set; }

    public virtual ICollection<Topic> Topics { get; set; } = new List<Topic>();
}
