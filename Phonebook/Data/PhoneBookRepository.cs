using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Phonebook.Models;

namespace Phonebook.Data
{
    public class PhoneBookRepository
    {
        private readonly PhoneBookContext _context;

        public PhoneBookRepository(PhoneBookContext context)
        {
            _context = context;
        }

        public IEnumerable<PhoneBook> GetPhoneBooks()
        {
            return _context.PhoneBooks.ToList();
        }

        public IEnumerable<Entry> GetEntries(int phoneBookId)
        {
            return _context.Entries.Where(e => e.PhoneBookID == phoneBookId);
        }

        public IEnumerable<Entry> GetEntriesWildCard(string wildCard)
        {
            return _context.Entries.Where(e => e.Name.Contains(wildCard) || e.PhoneNumber.Contains(wildCard));
        }
    }
}
