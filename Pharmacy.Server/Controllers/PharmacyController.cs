using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    //[ApiController]
    [Route("[controller]")]
    public class PharmacyController : ControllerBase
    {


        private readonly ILogger<PharmacyController> _logger;
        private readonly IPharmacyService _pharmacyService;

        public PharmacyController(IPharmacyService pharmacyService, ILogger<PharmacyController> logger)
        {
            _logger = logger;
            _pharmacyService = pharmacyService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        //public async Task<ActionResult<Pharmacy>> GetPharmacyList([FromQuery] QueryParameters @params)
        public async Task<ActionResult<Pharmacy>> GetPharmacyList([FromQuery] QueryParameters @params)
        {
            try
            {
                var itemsPerPage = 5;
                List<Pharmacy> result = await _pharmacyService.GetPharmacyListAsync(@params, itemsPerPage);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pharmacy>> UpdatePharmacyById(int id, [FromBody]Pharmacy pharmacy)
        {
           
            if (pharmacy == null)
            {
                _logger.LogError("Pharmacy sent from client is null.");
                return BadRequest("Pharmacy is null");
            }

            await _pharmacyService.UpdatePharmacyAsync(id, pharmacy);

            return NoContent();
        }

    }
}
