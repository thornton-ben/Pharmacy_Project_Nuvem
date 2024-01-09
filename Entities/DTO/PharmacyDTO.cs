using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Entities.DTO
{
    public class PharmacyDTO
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PharmacyId { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9_.-]*$", ErrorMessage = "Address required")]
        public string? Name { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9_.-]*$", ErrorMessage = "Address required")]
        public string? Address { get; set; }
        [Required]
        [RegularExpression("^[a-zA-Z0-9-]*$", ErrorMessage = "City required")]
        public string? City { get; set; }
        [Required]
        [RegularExpression("^[A-Z]{2}$", ErrorMessage = "State must be length of 2 upper case letters")]
        public string? State { get; set; }
        [Required]
        [RegularExpression("^[0-9]{5}$", ErrorMessage = "Zip Code must be numeric and 5 digits only")]
        public string? Zip { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int? FilledPrescriptions { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        [Required]
        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }
    }
}
