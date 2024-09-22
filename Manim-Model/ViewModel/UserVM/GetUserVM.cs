using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.ViewModel.UserVM
{
    public class GetUserVM
    {
        public string Id { get; set; } = string.Empty;
        public string? Username { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public long? Gender { get; set; }
    }
}
