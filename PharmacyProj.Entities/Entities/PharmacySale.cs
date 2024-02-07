using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyProj.Entities.Entities
{
    public class PharmacySale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PharmacySaleId { get; set; }
        [Required]
        public int? PharmacistId { get; set; }
        public int? DrugId { get; set; }
        [Required]
        public decimal? SalePrice { get; set; }
        [Required]
        public decimal? UnitsSold { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset? UpdatedDate { get; set; }
        [Required]
        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }
        public required Pharmacist Pharmacy { get; set; }
        public required Drug Drug { get; set; }
    }
}

