using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyProj.Services.Helpers
{
    public class QueryParameters
    {
        public string? SortColumn { get; set; }
        public string? SortOrder { get; set; }
        public int PageSize { get; set; } = 5;
        public int Page { get; set; } = 1;
        public int? Id { get; set; }
        
    }
}
