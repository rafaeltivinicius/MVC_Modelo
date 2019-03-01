using MVC_Arquitetura.Domain;
using MVC_Arquitetura.Repository.Context;
using MVC_Arquitetura.Repository.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private BookStoreDataContext _db;

        public AuthorRepository(BookStoreDataContext context)
        {
            _db = context;
        }

        public bool Create(Autor autor)
        {
            try
            {
                _db.Aturores.Add(autor);
                _db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void Delete(int id)
        {
            var autor = _db.Aturores.Find(id);
            _db.Aturores.Remove(autor);
            _db.SaveChanges();
        }

        public List<Autor> get()
        {
            return _db.Aturores.ToList();
        }

        public Autor GetById(int id)
        {
            return _db.Aturores.Find(id);
        }

        public List<Autor> GetByName(string name)
        {
            return _db.Aturores.Where(x => x.Nome.Trim().Contains(name.Trim())).ToList();
        }

        public bool Update(Autor autor)
        {
            try
            {
                _db.Entry<Autor>(autor).State = EntityState.Modified;
                _db.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
