using Microsoft.EntityFrameworkCore;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Services.Services
{
    public class PharmacistService : IPharmacistService
    {
        public Task<Pharmacist> DeletePharmacistAsync(Pharmacist pharmacist)
        {
            throw new NotImplementedException();
        }


    private readonly PharmacyDbContext _dbContext;

        public PharmacistService(PharmacyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Pharmacist>> GetPharmacistListAsync(QueryParameters parameters)
        {
            //TODO: insert new parameters to get deliveries for a pharmacy or warehouse
            //insert logic to page
            if (parameters.Id == null)
            {
                return await _dbContext.Pharmacist.OrderBy(p => p.PharmacistId)
                    .Skip((parameters.Page - 1) * parameters.PageSize)
                    .Take(parameters.PageSize)
                    .ToListAsync();
            }
            return await _dbContext.Pharmacist.Where(p => parameters.Id.Equals(p.PharmacistId)).ToListAsync();
        }

 
        public async Task<Pharmacist> UpdatePharmacistAsync(Pharmacist pharmacist)
        {
            var queryParams = new QueryParameters
            {
                PageSize = 1,
                Page = 1,
                Id = pharmacist.PharmacistId
            };
            var existingPharmacistList = await GetPharmacistListAsync(queryParams);
            var existingPharmacist = existingPharmacistList[0];

            if (existingPharmacist != null)
            {
                existingPharmacist.PharmacyId = pharmacist.PharmacyId is not null ? pharmacist.PharmacyId : existingPharmacist.PharmacyId;
                existingPharmacist.FirstName = !string.IsNullOrWhiteSpace(pharmacist.FirstName) ? pharmacist.FirstName : existingPharmacist.FirstName;
                existingPharmacist.LastName = !string.IsNullOrWhiteSpace(pharmacist.LastName) ? pharmacist.LastName : existingPharmacist.LastName;
                existingPharmacist.Age = pharmacist.Age is not null ? pharmacist.Age : existingPharmacist.Age;
                existingPharmacist.StartDate = pharmacist.StartDate is not null ? pharmacist.StartDate : existingPharmacist.StartDate;
                existingPharmacist.EndDate = pharmacist.EndDate is not null ? pharmacist.EndDate : existingPharmacist.EndDate;
                existingPharmacist.UpdatedDate = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync();
            //need to have logic if pharmacist doesn't exist to create a new one

            return existingPharmacist ?? pharmacist;
        }
    }
}
