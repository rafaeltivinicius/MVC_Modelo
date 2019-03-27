using MVC_Arquitetura.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Repository.Repositories.Contracts
{
    public interface IAuthorRepository : IDisposable
    {
        List<Autor> get();
        Autor GetById(int id);
        List<Autor> GetByName(string id);
        bool Create(Autor autor);
        bool Update(Autor autor, IList<Livro> livros);
        void Delete(int id);
    }
}
