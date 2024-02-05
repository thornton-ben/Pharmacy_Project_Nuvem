using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    //[ApiController]
    [Route("[controller]")]
    public class DeliveryController : ControllerBase
    {


        private readonly ILogger<DeliveryController> _logger;
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(IDeliveryService pharmacyService, ILogger<DeliveryController> logger)
        {
            _logger = logger;
            _deliveryService = pharmacyService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Delivery>> GetDeliveryList(QueryParameters getParams)
        {
            try
            {
                List<Delivery> result = await _deliveryService.GetDeliveryListAsync(getParams);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Delivery>> UpdateDeliveryById([FromBody]Delivery delivery)
        {
            try
            {
                var updateResult = await _deliveryService.UpdateDeliveryAsync(delivery);
                return Ok(updateResult);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}
