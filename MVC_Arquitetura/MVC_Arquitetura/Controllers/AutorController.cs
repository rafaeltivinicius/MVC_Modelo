using MVC_Arquitetura.Domain;
using MVC_Arquitetura.Repository.Repositories.Contracts;
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
        private IAuthorRepository _repository;

        public AutorController(IAuthorRepository repository)
        {
            _repository = repository;
        }

        [Route("listar")]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult CarregarTabela()
        {
            return Json(_repository.get(), JsonRequestBehavior.AllowGet);
        }

        [Route("criar")]
        public ActionResult Create(Autor author)
        {
            if (_repository.Create(author))
                return View("Index");

            return View(author);
        }

        [Route("editar/{id:int:min(1)}")]
        public ActionResult Edit(int id)
        {
            var author = _repository.GetById(id);
            return View(author);
        }

        [HttpPost]
        public ActionResult Edit(Autor author)
        {
            if (_repository.Update(author))
                return View("Index");

            return View(author);
        }

        [Route("excluir/{id:int}")]
        public ActionResult Delete(int id)
        {
            var author = _repository.GetById(id);
            return View();
        }

        [Route("excluir/{id:int}")]
        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteConfirm(int id)
        {
            _repository.Delete(id);
            return RedirectToAction("Index");
        }

    }
}