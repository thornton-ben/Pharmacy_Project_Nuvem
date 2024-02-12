using Microsoft.EntityFrameworkCore;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.DTO;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;
using System.Linq.Expressions;

namespace PharmacyProj.Services.Services
{
    public class DeliveryService : IDeliveryService
    {
        public Task<Delivery> DeleteDeliveryAsync(Delivery delivery)
        {
            throw new NotImplementedException();
        }


    private readonly PharmacyDbContext _dbContext;

        public DeliveryService(PharmacyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Delivery>> GetDeliveryAsync(QueryParameters parameters)
        {
            if (parameters.Id == null)
            {
                return await _dbContext.Delivery.OrderBy(p => p.DeliveryId)
                    .Skip((parameters.Page - 1) * parameters.PageSize)
                    .Take(parameters.PageSize)
                    .ToListAsync();
            }
            return await _dbContext.Delivery.Where(p => parameters.Id.Equals(p.PharmacyId)).ToListAsync();
        }

        public async Task<PagedList<DeliveryDTO>> GetDeliveryListAsync(QueryParameters parameters)
        {
            IQueryable<Delivery> deliveryQuery = _dbContext.Delivery;

            if (parameters.Id != null)
            {
                deliveryQuery = deliveryQuery.Where(p => parameters.Id.Equals(p.PharmacyId));
            }             

                var deliveryResponseQuery = deliveryQuery.Include(d => d.Pharmacy).Include(d => d.Drug).Include(d => d.Warehouse).OrderBy(p => p.DeliveryId)
                    .Select(d => new DeliveryDTO
                    {
                        DeliveryId = d.DeliveryId,
                        UnitCount = d.UnitCount,
                        UnitPrice = d.UnitPrice,
                        TotalPrice = d.TotalPrice,
                        DeliveryDate = d.DeliveryDate,
                        CreatedDate = d.CreatedDate,
                        UpdatedDate = d.UpdatedDate,
                        CreatedBy = d.CreatedBy,
                        UpdatedBy = d.UpdatedBy,
                        PharmacyName = d.Pharmacy != null ? d.Pharmacy.Name : null,
                        DrugName = d.Drug != null ? d.Drug.DrugName : null,
                        WarehouseName = d.Warehouse != null ? d.Warehouse.Name : null
                    });

                var deliveries = await PagedList<DeliveryDTO>.CreateAsync(deliveryResponseQuery, parameters.Page, parameters.PageSize);
                    return deliveries;
        }

 
        public async Task<Delivery> UpdateDeliveryAsync(Delivery delivery)
        {
            var queryParams = new QueryParameters
            {
                PageSize = 1,
                Page = 1,
                Id = delivery.DeliveryId
            };
            var existingDeliveryList = await GetDeliveryAsync(queryParams);
            var existingDelivery = existingDeliveryList.FirstOrDefault();

            if (existingDelivery != null)
            {
                existingDelivery.UnitPrice = delivery.UnitPrice is not null ? delivery.UnitPrice : existingDelivery.UnitPrice;
                existingDelivery.WarehouseId = delivery.WarehouseId is not null ? delivery.WarehouseId : existingDelivery.WarehouseId;
                existingDelivery.PharmacyId = delivery.PharmacyId is not null ? delivery.PharmacyId : existingDelivery.PharmacyId;
                existingDelivery.DrugId = delivery.DrugId is not null ? delivery.DrugId : existingDelivery.DrugId;
                existingDelivery.UnitCount = delivery.UnitCount is not null ? delivery.UnitCount : existingDelivery.UnitCount;
                existingDelivery.TotalPrice = delivery.TotalPrice is not null ? delivery.TotalPrice : existingDelivery.TotalPrice;
                existingDelivery.UpdatedDate = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync();

            return existingDelivery ?? delivery;
        }
    }
}
