using MVC_Arquitetura.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MVC_Arquitetura.Repository.Mapping
{
    public class AutorMap : EntityTypeConfiguration<Autor>
    {
        public AutorMap()
        {
            ToTable("Autor");
            HasKey(x => x.Id);
            Property(x => x.Nome).HasMaxLength(30).IsRequired().IsUnicode(true); ;
            HasMany(x => x.Livros).WithMany(x => x.Autor);
        }
    }
}
