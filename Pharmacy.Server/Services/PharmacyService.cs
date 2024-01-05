using Microsoft.EntityFrameworkCore;
using PharmacyProj.Database;
using PharmacyProj.Database.Models;
using PharmacyProj.Server.Interfaces;

namespace PharmacyProj.Server.Services
{
    public class PharmacyService : IPharmacyService
    {
        private readonly PharmacyDbContext _dbContext;

        public PharmacyService(PharmacyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Pharmacy>> GetPharmacyListAsync()
        {
            return await _dbContext.Pharmacy.ToListAsync();
        }

        public async Task<Pharmacy?> GetPharmacyByIdAsync(int pharmacyId)
        {
            return await _dbContext.Pharmacy.FirstOrDefaultAsync(x => x.PharmacyId == pharmacyId);
        }

        public async Task<Pharmacy> UpdatePharmacyAsync(Pharmacy pharmacy)
        {
            pharmacy.UpdatedDate = DateTime.Now;
            _dbContext.Update(pharmacy);
            await _dbContext.SaveChangesAsync();

            return pharmacy;
        }

    }
}
