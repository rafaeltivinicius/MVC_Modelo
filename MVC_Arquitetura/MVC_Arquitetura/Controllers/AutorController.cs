using MVC_Arquitetura.Domain;
using MVC_Arquitetura.Repository.Repositories.Contracts;
using MVC_Arquitetura.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_Arquitetura.Controllers
{
    [RoutePrefix("autores")]
    public class AutorController : Controller
    {
        private IAuthorRepository _repositoryAutor;
        private IBookRepository _repositoryLivro;

        public AutorController(IAuthorRepository repositoryA, IBookRepository repositoryL)
        {
            _repositoryAutor = repositoryA;
            _repositoryLivro = repositoryL;
        }

        [HttpGet]
        [Route("listar")]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult CarregarTabela()
        {
            return Json(_repositoryAutor.get(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("criar")]
        public ActionResult Create()
        {
            return View(_repositoryLivro.get());
        }

        [HttpPost]
        [Route("criar")]
        public ActionResult Create(Autor author)
        {
            if (_repositoryAutor.Create(author))
                return View("Index");

            return View(author);
        }

        [HttpGet]
        [Route("editar/{id:int}")]
        public ActionResult Edit(int id)
        {
            var ViewModel = new EditaAutorViewModel();

            //Remove Livros já vinculados ao Autor
            //var livroUpdate = livro.Where(p => !autor.Livros.Any(p2 => p2.Id == p.Id)).ToList();

            ViewModel.Autor = _repositoryAutor.GetById(id);
            ViewModel.Livro = _repositoryLivro.get();

            return View(ViewModel);
        }

        [HttpPost]
        [Route("editar")]
        public ActionResult Edit(Autor author)
        {
            var autor = _repositoryAutor.GetById(author.Id);
            var livrosNovos = _repositoryLivro.getByIdAll(author.Livros.Select(x => x.Id).ToArray());
            var livrosRemover = autor.Livros.Where(p => !livrosNovos.Any(p2 => p2.Id == p.Id)).ToList();

            autor.Nome = author.Nome;
            autor.Livros = livrosNovos;

            if (_repositoryAutor.Update(autor, livrosRemover))
                return View("Index");

            return View(author);
        }

        [Route("excluir/{id:int}")]
        public ActionResult Delete(int id)
        {
            var author = _repositoryAutor.GetById(id);
            return View();
        }

        [Route("excluir/{id:int}")]
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteConfirm(int id)
        {
            _repositoryAutor.Delete(id);
            return RedirectToAction("Index");
        }

    }
}