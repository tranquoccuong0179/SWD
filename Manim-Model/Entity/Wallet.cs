﻿using Manim_Core.Enum;
using Manim_Model.Base;
using System;
using System.Collections.Generic;

namespace Manim_Model.Entity;

public partial class Wallet : BaseEntity
{
    public Guid? UserId { get; set; }
    public decimal? Balance { get; set; }
    public EnumWallet Status { get; set; } = EnumWallet.Processing;
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    public virtual ApplicationUser? User { get; set; }
}
