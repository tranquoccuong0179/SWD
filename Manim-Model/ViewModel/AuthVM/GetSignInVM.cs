using Manim_Model.ViewModel.UserVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Manim_Model.ViewModel.AuthVM
{
    public class GetSignInVM
    {
        public GetUserVM User { get; set; } = new GetUserVM();
        public GetTokenVM Token { get; set; } = new GetTokenVM();
    }
}
