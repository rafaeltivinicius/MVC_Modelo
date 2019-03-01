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
    public class BookRepository : IBookRepository
    {
        private BookStoreDataContext _db;

        public BookRepository(BookStoreDataContext context)
        {
            _db = context;
        }

        public bool Create(Livro livro)
        {
            try
            {
                _db.Livros.Add(livro);
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
            var livro = _db.Livros.Find(id);
            _db.Livros.Remove(livro);
            _db.SaveChanges();
        }

        public List<Livro> get()
        {
            return _db.Livros.ToList();
        }
        public List<Categoria> GetCategory()
        {
            return _db.Categorias.ToList();
        }

        public Livro GetById(int id)
        {
            return _db.Livros.Find(id);
        }

        public List<Livro> GetByName(string name)
        {
            return _db.Livros.Where(x => x.Nome.Trim().Contains(name.Trim())).ToList();
        }

        public bool Update(Livro livro)
        {
            try
            {
                _db.Entry<Livro>(livro).State = EntityState.Modified;
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
