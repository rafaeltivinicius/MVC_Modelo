using MVC_Arquitetura.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MVC_Arquitetura.ViewModels
{
    public class EditaAutorViewModel
    {
        public Autor Autor { get; set; }
        public IEnumerable<Livro> Livro { get; set; }
    }
}