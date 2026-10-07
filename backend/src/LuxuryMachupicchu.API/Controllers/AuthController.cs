using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;

namespace LuxuryMachupicchu.API.Controllers;

public class LoginRequestDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("login-policy")]
    public IActionResult Login([FromBody] LoginRequestDto request)
    {
        var expectedUser = _configuration["AdminSettings:Username"] ?? "concierge@luxurymachupicchu.com";
        var expectedPass = _configuration["AdminSettings:Password"] ?? "MachuPicchuLuxury2026!";

        var inputUser = request.Username?.Trim() ?? string.Empty;
        var inputPass = request.Password?.Trim() ?? string.Empty;

        bool isValid = (string.Equals(inputUser, expectedUser, StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(inputUser, "admin", StringComparison.OrdinalIgnoreCase)) &&
                       string.Equals(inputPass, expectedPass, StringComparison.Ordinal);

        if (!isValid)
        {
            return Unauthorized(new { message = "Invalid credentials. Unauthorized access to Luxury Machupicchu Concierge Portal." });
        }

        var secretKey = _configuration["JWT_SECRET_KEY"] 
            ?? _configuration["JwtSettings:SecretKey"]
            ?? "LuxuryMachupicchuPeru_BelmondInspired_UltraSecureJwtKey_2026_Min32Chars!";
        var expiresAt = DateTime.UtcNow.AddDays(7);

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, expectedUser),
                new Claim(ClaimTypes.Name, "Luxury Machupicchu Concierge Director"),
                new Claim(ClaimTypes.Role, "Administrator"),
                new Claim("agency", "Luxury Machupicchu Peru E.I.R.L")
            }),
            Expires = expiresAt,
            Issuer = "LuxuryMachupicchuAPI",
            Audience = "LuxuryMachupicchuClients",
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(securityToken);

        return Ok(new
        {
            token = tokenString,
            username = expectedUser,
            fullName = "Luxury Machupicchu Concierge Director",
            role = "Administrator",
            expiresAt
        });
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult GetCurrentUser()
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value 
            ?? User.Identity?.Name 
            ?? "concierge@luxurymachupicchu.com";
        var fullName = User.FindFirst(ClaimTypes.Name)?.Value ?? "Luxury Machupicchu Concierge Director";
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? "Administrator";
        var agency = User.FindFirst("agency")?.Value ?? "Luxury Machupicchu Peru E.I.R.L";

        return Ok(new
        {
            authenticated = true,
            username,
            fullName,
            role,
            agency
        });
    }
}

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(IConfiguration configuration, ILogger<PaymentsController> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost("create-deposit-preference")]
    [AllowAnonymous]
    public IActionResult CreateDepositPreference([FromBody] DepositPreferenceRequest request)
    {
        var simPrefId = "LMP-DEP-" + Guid.NewGuid().ToString()[..8].ToUpper();
        var depositPercent = 0.30m; // 30% luxury reservation deposit
        var depositAmount = Math.Round(request.TotalAmount * depositPercent, 2);

        _logger.LogInformation("Creating luxury deposit preference for {TourTitle}. Amount: {Amount}", request.TourTitle, depositAmount);

        return Ok(new
        {
            preferenceId = simPrefId,
            depositAmount,
            currency = request.Currency ?? "USD",
            checkoutUrl = $"/pago/confirmacion?pref={simPrefId}&amount={depositAmount}&currency={request.Currency ?? "USD"}",
            mode = "simulation"
        });
    }
}

public class DepositPreferenceRequest
{
    public int TourId { get; set; }
    public string TourTitle { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public string Currency { get; set; } = "USD";
    public string GuestEmail { get; set; } = string.Empty;
}
