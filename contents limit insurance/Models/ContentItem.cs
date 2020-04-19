using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace contents_limit_insurance.Models
{
    public class ContentItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Value { get; set; }
    }
}
