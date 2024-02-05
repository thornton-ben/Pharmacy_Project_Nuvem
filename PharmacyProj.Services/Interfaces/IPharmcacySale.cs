using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;

namespace PharmacyProj.Services.Interfaces
{
    public interface IPharmacySaleService
    {
        Task<List<PharmacySale>> GetPharmacySaleListAsync(QueryParameters parameters);
        Task<PharmacySale> UpdatePharmacySaleAsync(PharmacySale pharmacySale);
        Task<PharmacySale> DeletePharmacySaleAsync(PharmacySale pharmacySale);
    }
}
