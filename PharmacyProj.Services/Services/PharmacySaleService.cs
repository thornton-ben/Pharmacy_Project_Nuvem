using Microsoft.EntityFrameworkCore;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Services.Services
{
    public class PharmacySaleService : IPharmacySaleService
    {
        public Task<PharmacySale> DeletePharmacySaleAsync(PharmacySale pharmacySale)
        {
            throw new NotImplementedException();
        }


    private readonly PharmacyDbContext _dbContext;

        public PharmacySaleService(PharmacyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<PharmacySale>> GetPharmacySaleListAsync(QueryParameters parameters)
        {
            if (parameters.Id == null)
            {
                return await _dbContext.PharmacySale.OrderBy(p => p.PharmacySaleId)
                    .Skip((parameters.Page - 1) * parameters.PageSize)
                    .Take(parameters.PageSize)
                    .ToListAsync();
            }
            return await _dbContext.PharmacySale.Where(p => parameters.Id.Equals(p.PharmacySaleId)).ToListAsync();
        }

 
        public async Task<PharmacySale> UpdatePharmacySaleAsync(PharmacySale pharmacySale)
        {
            var queryParams = new QueryParameters
            {
                PageSize = 1,
                Page = 1,
                Id = pharmacySale.PharmacySaleId
            };
            var existingPharmacySaleList = await GetPharmacySaleListAsync(queryParams);
            var existingPharmacySale = existingPharmacySaleList?.FirstOrDefault();

            if (existingPharmacySale != null)
            {
                existingPharmacySale.PharmacistId = pharmacySale.PharmacistId is not null ? pharmacySale.PharmacistId : existingPharmacySale.PharmacistId;
                existingPharmacySale.DrugId = pharmacySale.DrugId is not null ? pharmacySale.DrugId : existingPharmacySale.DrugId;
                existingPharmacySale.SalePrice = pharmacySale.SalePrice is not null ? pharmacySale.SalePrice : existingPharmacySale.SalePrice;
                existingPharmacySale.UpdatedDate = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync();

            return existingPharmacySale ?? pharmacySale;
        }
    }
}
