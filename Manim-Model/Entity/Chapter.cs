using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Chapter : BaseEntity
{
    public string SubjectId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool Status { get; set; } = true;
    public virtual Subject? Subject { get; set; }
    public virtual ICollection<Topic> Topics { get; set; } = new List<Topic>();
}
