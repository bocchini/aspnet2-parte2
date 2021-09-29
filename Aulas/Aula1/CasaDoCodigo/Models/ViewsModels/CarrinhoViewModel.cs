using System.Collections.Generic;
using System.Linq;

namespace CasaDoCodigo.Models.ViewsModels
{
    public class CarrinhoViewModel
    {
        public IList<ItemPedido> Items { get; }

        public CarrinhoViewModel(IList<ItemPedido> items)
        {
            Items = items;
        }

        public decimal Total => Items.Sum(i => i.Quantidade * i.PrecoUnitario);
    }
}
