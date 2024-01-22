using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;

namespace PharmacyProj.Services.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyByIdAsync(int id);
        Task<List<Pharmacy>> GetPharmacyListAsync(QueryParameters parameters, int itemsPerPage);
        Task<Pharmacy> UpdatePharmacyAsync(int id, Pharmacy pharmacy);
        Task<Pharmacy> CreatePharmacyAsync(Pharmacy pharmacy);
    }
}
