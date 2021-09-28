using CasaDoCodigo.Models;
using CasaDoCodigo.Models.ViewsModels;
using CasaDoCodigo.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CasaDoCodigo.Controllers
{
    public class PedidoController : Controller
    {
        private readonly IProdutoRepository produtoRepository;
        private readonly IPedidoRepository pedidoRepository;
        private readonly IItemPedidoRepository itemPedidoRepository;

        public PedidoController(IProdutoRepository produtoRepository, 
            IPedidoRepository pedidoRepository, IItemPedidoRepository itemPedido)
        {
            this.produtoRepository = produtoRepository;
            this.pedidoRepository = pedidoRepository;
            this.itemPedidoRepository = itemPedido;
        }

        public IActionResult Carrossel()
        {
            return View(produtoRepository.GetProdutos());
        }

        public IActionResult Carrinho(string codigo)
        {
            if(!string.IsNullOrEmpty(codigo))
            {
                pedidoRepository.AddItem(codigo);
            }

            var itens = pedidoRepository.GetPedido().Itens;
            var varrinhoViewModel = new CarrinhoViewModel(itens);

            return View(varrinhoViewModel);
        }

        public IActionResult Cadastro()
        {
            var pedido = pedidoRepository.GetPedido();
            if (pedido == null)
                return RedirectToAction("Carrocel");
            return View(pedido.Cadastro);
        }

        [HttpPost]
        public IActionResult Resumo(Cadastro cadastro)
        {
            return View(pedidoRepository.GetPedido());
        }

        [HttpPost]
        public UpdateQuantidadeResponse UpdateQuantidade([FromBody]ItemPedido itemPedido)
        {
            return pedidoRepository.UpdateQuantidade(itemPedido);
        }
    }
}
