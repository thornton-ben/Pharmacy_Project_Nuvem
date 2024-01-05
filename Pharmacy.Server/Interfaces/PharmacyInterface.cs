using PharmacyProj.Database.Models;


namespace PharmacyProj.Server.Interfaces
{

        public interface IPharmacyService
        {
            Task<Pharmacy?> GetPharmacyByIdAsync(int id);
            Task<List<Pharmacy>> GetPharmacyListAsync();
            Task<Pharmacy> UpdatePharmacyAsync(Pharmacy pharmacy);
        }
}
