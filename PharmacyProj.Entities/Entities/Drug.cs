using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyProj.Entities.Entities
{
    public class Drug
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DrugId { get; set; }
        [Required]
        public string? DrugName { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset? UpdatedDate { get; set; }
        [Required]
        public string? CreatedBy { get; set; }

        public string? UpdatedBy { get; set; }
    }
}

