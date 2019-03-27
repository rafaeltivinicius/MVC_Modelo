using MVC_Arquitetura.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Repository.Repositories.Contracts
{
    public interface IBookRepository : IDisposable
    {
        List<Livro> get();
        Livro GetById(int id);
        List<Livro> getByIdAll(int[] listId);
        List<Livro> GetByName(string id);
        List<Categoria> GetCategory();
        bool Create(Livro autor);
        bool Update(Livro autor);
        void Delete(int id);
    }
}
