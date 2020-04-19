using Microsoft.EntityFrameworkCore;

namespace contents_limit_insurance.Models
{
    public class ContentsContext : DbContext
    {
        public ContentsContext(DbContextOptions<ContentsContext> options)
            : base(options)
        {
        }

        public DbSet<ContentItem> ContentItem { get; set; }
    }
}
