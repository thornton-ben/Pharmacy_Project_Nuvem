using Microsoft.EntityFrameworkCore;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Services.Services
{
    public class PharmacyService : IPharmacyService
    {

        private readonly PharmacyDbContext _dbContext;

        public PharmacyService(PharmacyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Pharmacy>> GetPharmacyListAsync(QueryParameters parameters)
        {
            return await _dbContext.Pharmacy.OrderBy(p => p.PharmacyId)
                .Skip((parameters.Page - 1) * parameters.ItemsPerPage)
                .Take(parameters.ItemsPerPage)
                .ToListAsync();
        }

        public async Task<Pharmacy?> GetPharmacyByIdAsync(int pharmacyId)
        {
            return await _dbContext.Pharmacy.FirstOrDefaultAsync(x => x.PharmacyId == pharmacyId);
        }

        public async Task<Pharmacy> CreatePharmacyAsync(Pharmacy pharmacy)
        {
            pharmacy.CreatedDate = DateTime.Now;
            _dbContext.Add(pharmacy);
            await _dbContext.SaveChangesAsync();

            return pharmacy;
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
