using MVC_Arquitetura.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Repository.Repositories.Contracts
{
    public interface ICategoryRepository : IDisposable
    {
        List<Categoria> get();
        Categoria GetById(int id);
        List<Categoria> GetByName(string id);
        bool Create(Categoria autor);
        bool Update(Categoria autor);
        void Delete(int id);
    }
}
