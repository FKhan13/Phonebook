using Microsoft.EntityFrameworkCore;
using Phonebook.Models;

namespace Phonebook.Data
{
    public class PhoneBookContext : DbContext
    {
        public PhoneBookContext (DbContextOptions<PhoneBookContext> options)
            : base(options)
        {
        }

        public DbSet<PhoneBook> PhoneBooks { get; set; }
        public DbSet<Entry> Entries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PhoneBook>().ToTable("PhoneBook");
            modelBuilder.Entity<Entry>().ToTable("Entry");
        }
    }
}
