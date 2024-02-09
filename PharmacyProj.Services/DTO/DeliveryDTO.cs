using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using PharmacyProj.Entities.Entities;

namespace PharmacyProj.Services.DTO
{
    public class DeliveryDTO
    {
       
        public int DeliveryId { get; set; }
        
        public int? UnitCount { get; set; }
        
        public decimal? UnitPrice { get; set; }
        
        public decimal? TotalPrice { get; set; }
        
        public DateTimeOffset DeliveryDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset? UpdatedDate { get; set; }
        
        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }
        public string? PharmacyName { get; set; }
        public string? DrugName { get; set; }
        public string? WarehouseName { get; set; }
    }
}
//PharmacyDisplayResult<T> : IDisplayResult<T> where T : Pharmacy
//{
//    public int TotalCount { get; set; }
//public IEnumerable<T>? List { get; set; }
//}

//public interface IDisplayResult<T> where T : class
//{
//    IEnumerable<T>? List { get; set; }
//    int TotalCount { get; set; }
//}