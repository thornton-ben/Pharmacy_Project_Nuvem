using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.DTO;
using PharmacyProj.Services.Helpers;

namespace PharmacyProj.Services.Interfaces
{
    public interface IDeliveryService
    {
        Task<PagedList<DeliveryDTO>> GetDeliveryListAsync(QueryParameters parameters);
        Task<Delivery> UpdateDeliveryAsync(Delivery delivery);
        Task<Delivery> DeleteDeliveryAsync(Delivery delivery);
    }
}
