using Manim_Model.ViewModel.UserVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.ViewModel.AuthVM
{
    public class GoogleAuthVM
    {
        public string Email { get; set; } = string.Empty;
        public string? Name { get; set; }
        public GetTokenVM? Token { get; set; } 
        //public GetTokenVM Token { get; set; } = new GetTokenVM();
    }
}
