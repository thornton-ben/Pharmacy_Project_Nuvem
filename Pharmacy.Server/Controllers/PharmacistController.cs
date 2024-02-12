using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    [Route("[controller]")]
    public class PharmacistController : ControllerBase
    {


        private readonly ILogger<PharmacistController> _logger;
        private readonly IPharmacistService _pharmacistService;

        public PharmacistController(IPharmacistService pharmacyService, ILogger<PharmacistController> logger)
        {
            _logger = logger;
            _pharmacistService = pharmacyService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pharmacist>> GetPharmacistList(QueryParameters getParams)
        {
            try
            {
                List<Pharmacist> result = await _pharmacistService.GetPharmacistListAsync(getParams);
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
        public async Task<ActionResult<Pharmacist>> UpdatePharmacistById([FromBody]Pharmacist pharmacist)
        {
            try
            {
                var updateResult = await _pharmacistService.UpdatePharmacistAsync(pharmacist);
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
