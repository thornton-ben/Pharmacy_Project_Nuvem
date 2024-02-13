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
            if (parameters.Id == null)
            {
                return await _dbContext.Pharmacy.OrderBy(p => p.PharmacyId)
                    .Skip((parameters.Page - 1) * parameters.PageSize)
                    .Take(parameters.PageSize)
                    .ToListAsync();
            }
            return await _dbContext.Pharmacy.Where(p => parameters.Id.Equals(p.PharmacyId)).ToListAsync();
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
            var queryParams = new QueryParameters
            {
                PageSize = 1,
                Page = 1,
                Id = pharmacy.PharmacyId
            };
            var existingPharmacyList = await GetPharmacyListAsync(queryParams);
            var existingPharmacy = existingPharmacyList?.FirstOrDefault();

            if (existingPharmacy != null)
            {
                existingPharmacy.Name = !string.IsNullOrWhiteSpace(pharmacy.Name) ? pharmacy.Name : existingPharmacy.Name;
                existingPharmacy.Address = !string.IsNullOrWhiteSpace(pharmacy.Address) ? pharmacy.Address : existingPharmacy.Address;
                existingPharmacy.City = !string.IsNullOrWhiteSpace(pharmacy.City) ? pharmacy.City : existingPharmacy.City;
                existingPharmacy.State = !string.IsNullOrWhiteSpace(pharmacy.State) ? pharmacy.State : existingPharmacy.State;
                existingPharmacy.Zip = !string.IsNullOrWhiteSpace(pharmacy.Zip) ? pharmacy.Zip : existingPharmacy.Zip;
                existingPharmacy.FilledPrescriptions = pharmacy.FilledPrescriptions is not null ? pharmacy.FilledPrescriptions : existingPharmacy.FilledPrescriptions;
                existingPharmacy.UpdatedDate = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync();

            return existingPharmacy ?? pharmacy;
        }
    }
}
