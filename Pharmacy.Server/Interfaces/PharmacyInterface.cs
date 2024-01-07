using PharmacyProj.Database.Models;


namespace PharmacyProj.Server.Interfaces
{

        public interface IPharmacyService
        {
            Task<Pharmacy?> GetPharmacyByIdAsync(int id);
            Task<List<Pharmacy>> GetPharmacyListAsync(QueryParameters parameters);
            Task<Pharmacy> UpdatePharmacyAsync(Pharmacy pharmacy);
        Task<Pharmacy> CreatePharmacyAsync(Pharmacy pharmacy);
        }
}
