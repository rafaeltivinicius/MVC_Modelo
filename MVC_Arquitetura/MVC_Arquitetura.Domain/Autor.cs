using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Domain
{
    public class Autor
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public ICollection<Livro> Livros { get; set; }

        public Autor()
        {
            this.Livros = new List<Livro>();
        }
    }
}
