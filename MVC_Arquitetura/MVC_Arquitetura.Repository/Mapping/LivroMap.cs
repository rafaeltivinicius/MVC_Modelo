using MVC_Arquitetura.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Repository.Mapping
{
    public class LivroMap : EntityTypeConfiguration<Livro>
    {
        public LivroMap()
        {
            ToTable("Livro");
            HasKey(x => x.Id);
            Property(x => x.Datalancamento).IsRequired();
            Property(x => x.Nome).HasMaxLength(30).IsRequired();
        }
    }
}
