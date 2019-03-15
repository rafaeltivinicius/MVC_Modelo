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
    public class CategoryRepository : ICategoryRepository
    {
        private BookStoreDataContext _db;

        public CategoryRepository(BookStoreDataContext context)
        {
            _db = context;
        }

        public bool Create(Categoria categoria)
        {
            try
            {
                _db.Categorias.Add(categoria);
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
            var categoria = _db.Categorias.Find(id);
            _db.Categorias.Remove(categoria);
            _db.SaveChanges();
        }

        public List<Categoria> get()
        {
            return _db.Categorias.AsNoTracking().ToList();
        }

        public Categoria GetById(int id)
        {
            return _db.Categorias.Find(id);
        }

        public List<Categoria> GetByName(string name)
        {
            return _db.Categorias.AsNoTracking().Where(x => x.Nome.Trim().Contains(name.Trim())).ToList();
        }

        public bool Update(Categoria categoria)
        {
            try
            {
                _db.Entry<Categoria>(categoria).State = EntityState.Modified;
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
