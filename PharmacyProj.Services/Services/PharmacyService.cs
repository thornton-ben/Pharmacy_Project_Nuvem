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

        public async Task<List<Pharmacy>> GetPharmacyListAsync(QueryParameters parameters, int itemsPerPage)
        {
            if (parameters.Id == null)
            {
                return await _dbContext.Pharmacy.OrderBy(p => p.Id)
                    .Skip((parameters.Page - 1) * itemsPerPage)
                    .Take(itemsPerPage)
                    .ToListAsync();
            }
            return await _dbContext.Pharmacy.Where(p => parameters.Id.Equals(p.Id)).ToListAsync();
        }

        public async Task<Pharmacy> CreatePharmacyAsync(Pharmacy pharmacy)
        {
            pharmacy.CreatedDate = DateTime.Now;
            _dbContext.Add(pharmacy);
            await _dbContext.SaveChangesAsync();

            return pharmacy;
        }

        public async Task<Pharmacy> UpdatePharmacyAsync(int id, Pharmacy pharmacy)
        {
            var queryParams = new QueryParameters
            {
                Page = 1,
                Id = id
            };
            var existingPharmacyList = await GetPharmacyListAsync(queryParams, 1);
            var existingPharmacy = existingPharmacyList[0];

            if (existingPharmacy != null)
            {
                existingPharmacy.Name = !string.IsNullOrWhiteSpace(pharmacy.Name) ? pharmacy.Name : pharmacy.Name;
                existingPharmacy.Address = !string.IsNullOrWhiteSpace(pharmacy.Address) ? pharmacy.Address : pharmacy.Address;
                existingPharmacy.City = !string.IsNullOrWhiteSpace(pharmacy.City) ? pharmacy.City : pharmacy.City;
                existingPharmacy.State = !string.IsNullOrWhiteSpace(pharmacy.State) ? pharmacy.State : pharmacy.State;
                existingPharmacy.Zip = !string.IsNullOrWhiteSpace(pharmacy.Zip) ? pharmacy.Zip : pharmacy.Zip;
                existingPharmacy.FilledPrescriptions = pharmacy.FilledPrescriptions is not null ? pharmacy.FilledPrescriptions : pharmacy.FilledPrescriptions;
                existingPharmacy.UpdatedDate = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync();

            return existingPharmacy ?? pharmacy;
        }
    }
}
