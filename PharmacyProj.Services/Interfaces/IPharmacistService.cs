using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;

namespace PharmacyProj.Services.Interfaces
{
    public interface IPharmacistService
    {
        Task<List<Pharmacist>> GetPharmacistListAsync(QueryParameters parameters);
        Task<Pharmacist> UpdatePharmacistAsync(Pharmacist pharmacist);
        Task<Pharmacist> DeletePharmacistAsync(Pharmacist pharmacist);
    }
}
