using System.Linq;
using Phonebook.Models;

namespace Phonebook.Data
{
    public static class DbInitialiser
    {
        public static void Initialize(PhoneBookContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.PhoneBooks.Any())
            {
                return; // DB has been seeded
            }

            PhoneBook[] phoneBooks = new PhoneBook[]
            {
                new PhoneBook {ID = 1, Name = "Home"},
                new PhoneBook {Name = "Office"},
                new PhoneBook {Name = "Club"}
            };

            context.PhoneBooks.AddRange(phoneBooks);
            context.SaveChanges();

            Entry[] entries = new Entry[]
            {
                new Entry {Name = "Home 1", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 2", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 3", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 4", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 5", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 6", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 7", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 8", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Home 9", PhoneNumber = "0123456789", PhoneBookID = 1},
                new Entry {Name = "Office 1", PhoneNumber = "0123456789", PhoneBookID = 2},
                new Entry {Name = "Office 2", PhoneNumber = "0123456789", PhoneBookID = 2},
                new Entry {Name = "Office 3", PhoneNumber = "0123456789", PhoneBookID = 2},
                new Entry {Name = "Office 4", PhoneNumber = "0123456789", PhoneBookID = 2},
                new Entry {Name = "Office 5", PhoneNumber = "0123456789", PhoneBookID = 2},
                new Entry {Name = "Office 6", PhoneNumber = "0123456789", PhoneBookID = 2},
                new Entry {Name = "Club 1", PhoneNumber = "0123456789", PhoneBookID = 3},
                new Entry {Name = "Club 2", PhoneNumber = "0123456789", PhoneBookID = 3},
                new Entry {Name = "Club 3", PhoneNumber = "0123456789", PhoneBookID = 3},
                new Entry {Name = "Club 4", PhoneNumber = "0123456789", PhoneBookID = 3},
                new Entry {Name = "Club 5", PhoneNumber = "0123456789", PhoneBookID = 3},
            };

            context.Entries.AddRange(entries);
            context.SaveChanges();
        }
    }
}
