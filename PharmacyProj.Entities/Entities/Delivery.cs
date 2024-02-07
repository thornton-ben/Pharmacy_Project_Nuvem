using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyProj.Entities.Entities
{
    public class Delivery
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DeliveryId { get; set; }
        [Required]
        public int? WarehouseId { get; set; }
        [Required]
        public int? PharmacyId { get; set; }
        [Required]
        public int? DrugId { get; set; }
        [Required]
        public int? UnitCount { get; set; }
        [Required]
        public decimal? UnitPrice { get; set; }
        [Required]
        public decimal? TotalPrice { get; set; }
        [Required]
        public DateTimeOffset DeliveryDate { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset? UpdatedDate { get; set; }
        [Required]
        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }
        public required Pharmacy Pharmacy { get; set; }
        public required Drug Drug { get; set; } 
        public required Warehouse Warehouse { get; set; }

    }
}

