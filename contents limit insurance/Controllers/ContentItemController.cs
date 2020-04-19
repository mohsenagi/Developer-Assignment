using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using contents_limit_insurance.Models;

namespace contents_limit_insurance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentItemController : ControllerBase
    {
        private readonly ContentsContext _context;

        public ContentItemController(ContentsContext context)
        {
            _context = context;
        }

        // GET: api/ContentItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContentItem>>> GetContentItem()
        {
            return await _context.ContentItem.ToListAsync();
        }

        // GET: api/ContentItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContentItem>> GetContentItem(long id)
        {
            var contentItem = await _context.ContentItem.FindAsync(id);

            if (contentItem == null)
            {
                return NotFound();
            }

            return contentItem;
        }

        // PUT: api/ContentItem/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContentItem(long id, ContentItem contentItem)
        {
            if (id != contentItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(contentItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ContentItem
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ContentItem>> PostContentItem(ContentItem contentItem)
        {
            _context.ContentItem.Add(contentItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContentItem", new { id = contentItem.Id }, contentItem);
        }

        // DELETE: api/ContentItem/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ContentItem>> DeleteContentItem(long id)
        {
            var contentItem = await _context.ContentItem.FindAsync(id);
            if (contentItem == null)
            {
                return NotFound();
            }

            _context.ContentItem.Remove(contentItem);
            await _context.SaveChangesAsync();

            return contentItem;
        }

        private bool ContentItemExists(long id)
        {
            return _context.ContentItem.Any(e => e.Id == id);
        }
    }
}
