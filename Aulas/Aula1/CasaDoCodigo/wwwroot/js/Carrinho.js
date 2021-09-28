class Carrinho {
    clickIncremento(btn) {
        let data = this.getData(btn);
        data.Quantidade++;
        this.postQuantidade(data);
    }

    clickDecremento(btn) {
        let data = this.getData(btn);
        data.Quantidade--;
        this.postQuantidade(data);
    }

    getData(elemento) {
        let linhaItem = $(elemento).parents('[item-id]');
        let itemId = $(linhaItem).attr('item-id');
        let novaQtde = $(linhaItem).find('input').val();
        return {
            Id: itemId,
            Quantidade: novaQtde
        };
    }

    updateQuantidade(input) {
        let data = this.getData(input);
        this.postQuantidade(data);
    }

    postQuantidade(data) {
        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
        }).done(function (response) {
            let itemPedido = response.itemPedido;
            let linhaDoItem = $(`[item-id=${itemPedido.Id}]`);
            linhaDoItem.find('input').val(itemPedido.Quantidade);
            linhaDoItem.find('[subtotal]').html((itemPedido.subTotal).duasCasas());
            let carrinhoViewModel = response.carrinhoViewModel;
            $('[numero-itens]').html('Total: ' + carrinhoViewModel.items.length + ' itens');
            $('[total]').html((carrinhoViewModel.total).duasCasas());

            if (itemPedido.quantidade == 0) {
                linhaDoItem.remove();
            }

            //debugger;
        });
    }
}

let carrinho = new Carrinho();

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}

