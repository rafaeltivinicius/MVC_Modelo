using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Domain
{
    public class Livro
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string ISBN { get; set; }
        public DateTime Datalancamento { get; set; }
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
        public ICollection<Autor> Autor { get; set; }

        public Livro()
        {
            this.Autor = new List<Autor>();
        }
    }
}
