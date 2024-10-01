using System.ComponentModel.DataAnnotations;

namespace SWD392.Manim.Repositories.Base
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
        public DateTime? DeletedAt { get; set; }
    }
}
