using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Phonebook.Data;
using Phonebook.Models;

namespace Phonebook.Controllers
{
    public class PhoneBookController : Controller
    {
        private readonly PhoneBookRepository _repository;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repository"></param>
        public PhoneBookController(PhoneBookRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Get all Phone Book Entries
        /// TODO: Limit results
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<PhoneBook> GetPhoneBooks()
        {
            return _repository.GetPhoneBooks();
        }

        /// <summary>
        /// Get Phone Book Entries using a wildcard search string
        /// </summary>
        /// <param name="phoneBookId"></param>
        /// <param name="wildCard"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Entry> GetEntriesWithWildCard(string phoneBookId, string wildCard)
        {
            return _repository.GetEntriesWildCard(phoneBookId, wildCard);
        }

        /// <summary>
        /// Add Entry to a Phone Book
        /// </summary>
        /// <param name="entry"></param>
        [HttpPost]
        public void AddEntry([FromBody] Entry entry)
        {
            _repository.AddEntry(entry);
        }
    }
}
