using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Database.Models;
using PharmacyProj.Server.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    [ApiController]
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
        public async Task<ActionResult<Pharmacy>> GetPharmacyList([FromQuery] QueryParameters @params)
        {
            try
            {
                List<Pharmacy> result = await _pharmacyService.GetPharmacyListAsync(@params);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{pharmacyId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pharmacy>> GetPharmacyById(int pharmacyId)
        {
            try
            {
                Pharmacy? result = await _pharmacyService.GetPharmacyByIdAsync(pharmacyId);
                return result == null ? NotFound() : Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{pharmacyId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pharmacy>> UpdatePharmacyByIdAsync(int pharmacyId, [FromBody]Pharmacy pharmacy)
        {
            if (pharmacy == null)
            {
                _logger.LogError("Pharmacy sent from client is null.");
                return BadRequest("Pharmacy is null");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid owner ojbect sent from client.");
                return BadRequest("Invalid model object");
            }

            var dbPharmacy = _pharmacyService.GetPharmacyByIdAsync(pharmacyId);
            if (dbPharmacy == null)
            {
                _logger.LogError($"Pharmacy with pharmacyId: {pharmacyId}, hasn't been found in database.");
                return NotFound();
            }

            await _pharmacyService.UpdatePharmacyAsync(pharmacy);

            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pharmacy>> CreatePharmacyAsync(Pharmacy pharmacy)
        {
            //TODO: need to check to see if pharmacy alread exists
            try
            {
                Pharmacy result = await _pharmacyService.CreatePharmacyAsync(pharmacy);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}
