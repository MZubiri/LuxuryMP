namespace LuxuryMachupicchu.Domain.Entities;

public class Category
{
    public int Id { get; set; }
    public string NameEn { get; set; } = string.Empty;
    public string NameEs { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<Tour> Tours { get; set; } = new List<Tour>();
}
