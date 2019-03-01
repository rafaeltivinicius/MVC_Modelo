using MVC_Arquitetura.Domain;
using MVC_Arquitetura.Repository.Repositories.Contracts;
using MVC_Arquitetura.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_Arquitetura.Controllers
{
    [RoutePrefix("livros")]
    public class LivroController : Controller
    {
        IBookRepository _repository { get; set; }

        public LivroController(IBookRepository repository)
        {
            _repository = repository;
        }

        [Route("listar")]
        public ActionResult Index()
        {
            return View(_repository.get());
        }

        [Route("criar")]
        public ActionResult Create()
        {
            var categorias = _repository.GetCategory();
            var model = new CriarEditaLivroViewModel
            {
                Nome = "",
                ISBN = "",
                Datalancamento = DateTime.Now,
                CategoriaId = 0,
                CategoriaOptions = new SelectList(categorias, "Id", "Nome")
            };

            return View(model);
        }

        [HttpPost]
        [Route("criar")]
        public ActionResult Create(CriarEditaLivroViewModel model)
        {
            if (!ModelState.IsValid)
            {
                Create();
            }

            var livro = new Livro();
            livro.Nome = model.Nome;
            livro.ISBN = model.ISBN;
            livro.Datalancamento = model.Datalancamento;
            livro.CategoriaId = model.CategoriaId;

            try
            {
                _repository.Create(livro);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("Mensagem", e.Message);

                var categorias = _repository.GetCategory();
                model.CategoriaOptions = new SelectList(categorias, "Id", "Nome");

                return View(model);
            }

            return RedirectToAction("Index");
        }

        [Route("editar")]
        public ActionResult Edit(int id)
        {
            var categorias = _repository.GetCategory();
            var livro = _repository.GetById(id);

            var model = new CriarEditaLivroViewModel
            {
                Nome = livro.Nome,
                ISBN = livro.ISBN,
                Datalancamento = livro.Datalancamento,
                CategoriaId = livro.CategoriaId,
                CategoriaOptions = new SelectList(categorias, "Id", "Nome")
            };

            return View(model);
        }

        [HttpPost]
        [Route("editar")]
        public ActionResult Edit(CriarEditaLivroViewModel model)
        {
            var livro = _repository.GetById(model.Id);

            livro.Nome = model.Nome;
            livro.ISBN = model.ISBN;
            livro.Datalancamento = model.Datalancamento;
            livro.CategoriaId = model.CategoriaId;

            _repository.Update(livro);

            return RedirectToAction("Index");
        }
    }
}