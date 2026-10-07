using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<MediaController> _logger;

    public MediaController(IWebHostEnvironment env, ILogger<MediaController> logger)
    {
        _env = env;
        _logger = logger;
    }

    /// <summary>
    /// Uploads an image file with format validation and sanitized naming.
    /// Supports multipart/form-data.
    /// </summary>
    [HttpPost("upload")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile? file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { message = "No se ha proporcionado ningún archivo de imagen." });
        }

        if (file.Length > 25 * 1024 * 1024)
        {
            return BadRequest(new { message = "El archivo excede el límite máximo de 25 MB." });
        }

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        var allowedExtensions = new[] { ".webp", ".jpg", ".jpeg", ".png", ".gif" };
        if (!allowedExtensions.Contains(ext))
        {
            return BadRequest(new { message = "Formato de imagen no permitido. Utilice WebP, JPG o PNG." });
        }

        var targetFolder = ResolveUploadsDirectory();
        Directory.CreateDirectory(targetFolder);

        var safeFileName = $"expedition_{DateTime.UtcNow:yyyyMMdd_HHmmss}_{Guid.NewGuid().ToString("N")[..8]}{ext}";
        var fullPath = Path.Combine(targetFolder, safeFileName);

        await using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var relativeUrl = $"assets/uploads/{safeFileName}";
        _logger.LogInformation("Image uploaded successfully: {RelativeUrl} ({Size} bytes)", relativeUrl, file.Length);

        return Ok(new
        {
            success = true,
            url = relativeUrl,
            fileName = safeFileName,
            sizeBytes = file.Length,
            contentType = file.ContentType
        });
    }

    /// <summary>
    /// Uploads an image from base64 data string (convenient fallback from HTML5 Canvas compression).
    /// </summary>
    [HttpPost("upload-base64")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UploadBase64([FromBody] Base64UploadRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Base64Data))
        {
            return BadRequest(new { message = "Los datos base64 de la imagen son requeridos." });
        }

        var rawData = request.Base64Data;
        var ext = ".webp";
        if (rawData.StartsWith("data:image/"))
        {
            var headerEnd = rawData.IndexOf(";base64,");
            if (headerEnd > 0)
            {
                var mime = rawData.Substring(5, headerEnd - 5);
                ext = mime switch
                {
                    "image/jpeg" => ".jpg",
                    "image/png" => ".png",
                    "image/gif" => ".gif",
                    _ => ".webp"
                };
                rawData = rawData.Substring(headerEnd + 8);
            }
        }

        byte[] bytes;
        try
        {
            bytes = Convert.FromBase64String(rawData);
        }
        catch
        {
            return BadRequest(new { message = "El contenido base64 de la imagen no es válido." });
        }

        if (bytes.Length > 25 * 1024 * 1024)
        {
            return BadRequest(new { message = "La imagen procesada excede el límite de 25 MB." });
        }

        var targetFolder = ResolveUploadsDirectory();
        Directory.CreateDirectory(targetFolder);

        var safeFileName = $"expedition_{DateTime.UtcNow:yyyyMMdd_HHmmss}_{Guid.NewGuid().ToString("N")[..8]}{ext}";
        var fullPath = Path.Combine(targetFolder, safeFileName);

        await System.IO.File.WriteAllBytesAsync(fullPath, bytes);

        var relativeUrl = $"assets/uploads/{safeFileName}";
        _logger.LogInformation("Base64 image uploaded: {RelativeUrl} ({Size} bytes)", relativeUrl, bytes.Length);

        return Ok(new
        {
            success = true,
            url = relativeUrl,
            fileName = safeFileName,
            sizeBytes = bytes.Length
        });
    }

    private string ResolveUploadsDirectory()
    {
        var curr = Directory.GetCurrentDirectory();
        var dir = new DirectoryInfo(curr);
        while (dir != null && !Directory.Exists(Path.Combine(dir.FullName, "frontend")))
        {
            dir = dir.Parent;
        }

        if (dir != null && Directory.Exists(Path.Combine(dir.FullName, "frontend")))
        {
            return Path.Combine(dir.FullName, "frontend", "assets", "uploads");
        }

        return Path.Combine(curr, "wwwroot", "assets", "uploads");
    }
}

public class Base64UploadRequest
{
    public string Base64Data { get; set; } = string.Empty;
    public string? FileName { get; set; }
}
