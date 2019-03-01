using MVC_Arquitetura.Validators;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_Arquitetura.ViewModels
{
    public class CriarEditaLivroViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Nome inválido")]
        [Display(Name = "Nome do Livro")]
        public string Nome { get; set; }
        [Required(ErrorMessage = "ISBN inválido")]
        public string ISBN { get; set; }
        [Required(ErrorMessage = "Data inválida")]
        [Display(Name = "Data de lançamento")]
        [DataType(DataType.DateTime)]
        public DateTime Datalancamento { get; set; }
        [Required(ErrorMessage = "Selecione uma categoria")]
        public int CategoriaId { get; set; }
        public SelectList CategoriaOptions { get; set; }
        [CheckAgeValidator]
        public DateTime DataNascimento { get; set; }

    }
}