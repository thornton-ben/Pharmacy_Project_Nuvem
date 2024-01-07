using System.ComponentModel.DataAnnotations;

namespace PharmacyProj.Database.Models
{
    public class Pharmacy
    {
        public int PharmacyId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? State { get; set; }
        [Required]
        [RegularExpression("^[0-9]*$", ErrorMessage = "Zip Code must be numeric only")]
        public string? Zip { get; set; }
        [Required]
        public int? FilledPrescriptions { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
