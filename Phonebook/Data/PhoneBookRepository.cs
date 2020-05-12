using System;
using System.Collections.Generic;
using System.Linq;
using Phonebook.Models;

namespace Phonebook.Data
{
    public class PhoneBookRepository
    {
        private readonly PhoneBookContext _context;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="context"></param>
        public PhoneBookRepository(PhoneBookContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all Phone Books
        /// </summary>
        /// <returns></returns>
        public IEnumerable<PhoneBook> GetPhoneBooks()
        {
            return _context.PhoneBooks.ToList().OrderBy(p => p.Name);
        }

        /// <summary>
        /// Get Phone Book Entries using a wild card search string
        /// </summary>
        /// <param name="phoneBookId"></param>
        /// <param name="wildCard"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException">Thrown when phoneBookId cannot be parsed to a valid integer</exception>
        public IEnumerable<Entry> GetEntriesWildCard(string phoneBookId, string wildCard)
        {
            if (string.IsNullOrWhiteSpace(phoneBookId) || !int.TryParse(phoneBookId, out int id))
                throw new ArgumentException("Value must be an integer.", nameof(phoneBookId));

            wildCard ??= "";

            return _context.Entries
                .Where(e => (e.Name.Contains(wildCard) || e.PhoneNumber.Contains(wildCard)) && e.PhoneBookID == id)
                .OrderBy(e => e.Name);
        }

        /// <summary>
        /// Add entry
        /// </summary>
        /// <param name="entry"></param>
        public void AddEntry(Entry entry)
        {
            if (entry.PhoneBookID == default)
                throw new ArgumentException("Entry must have a valid Phone Book ID.", nameof(entry));

            _context.Entries.Add(entry);
            _context.SaveChanges();
        }
    }
}
