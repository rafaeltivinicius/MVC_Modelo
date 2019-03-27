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
            _db.Configuration.LazyLoadingEnabled = false;
            _db.Configuration.ProxyCreationEnabled = false;
        }

        public bool Create(Autor autor)
        {
            try
            {
                _db.Entry<Autor>(autor).State = EntityState.Detached;
                _db.Aturores.Attach(autor);

                _db.Aturores.Add(autor);
                _db.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
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
            return _db.Aturores.AsNoTracking().ToList();
        }

        public Autor GetById(int id)
        {
            return _db.Aturores.Include(x => x.Livros).Where(x => x.Id == id).FirstOrDefault();
        }

        public List<Autor> GetByName(string name)
        {
            return _db.Aturores.AsNoTracking().Where(x => x.Nome.Trim().Contains(name.Trim())).ToList();
        }

        public bool Update(Autor autor, IList<Livro> livrosRemover)
        {
            try
            {
                //foreach (var livroD in livrosRemover)
                //    _db.Entry(livroD).State = EntityState.Deleted;

                foreach (var livroA in autor.Livros)
                {
                    _db.Entry(livroA).State = EntityState.Modified;
                    _db.SaveChanges();
                }

                _db.Entry<Autor>(autor).State = EntityState.Modified;
                _db.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
