class Carrinho {
    clickIncremento(button) {
        let data = this.getData(button);
        data.Quantidade++;
        this.postQuantidade(data);
    }

    clickDecremento(button) {
        let data = this.getData(button);
        data.Quantidade--;
        this.postQuantidade(data);
    }

    getData(elemento) {
        let linhaItem = $(elemento).parents('[item-id]');
        let itemId = $(linhaItem).attr('item-id');
        let novaQuantidade = $(linhaItem).find('input').val();
        return {
            Id: itemId,
            Quantidade: novaQuantidade
        };
    }

    updateQuantidade(input) {
        let data = this.getData(input);
        this.postQuantidade(data);
    }

    postQuantidade(data) {
        let headers = {};
        headers['RequestVerificationToken'] = deveRetornarHeaderToken();
        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: headers
        }).done(function (response) {
            deveMontarHml(response);
        });
    }
}

let carrinho = new Carrinho();

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}

function deveRetornarHeaderToken() {
    return $('[name=__RequestVerificationToken]').val();
}

function deveMontarHml(response) {
    let itemPedido = response.itemPedido;
    let linhaDoItem = $(`[item-id=${itemPedido.id}]`);
    linhaDoItem.find('input').val(itemPedido.quantidade);
    linhaDoItem.find('[subtotal]').html((itemPedido.subTotal).duasCasas());
    let carrinhoViewModel = response.carrinhoViewModel;
    $('[numero-itens]').html('Total: ' + carrinhoViewModel.items.length + ' itens');
    $('[total]').html((carrinhoViewModel.total).duasCasas());
    DeveVerificarOPedidoZero(linhaDoItem, itemPedido.quantidade);
}

function DeveVerificarOPedidoZero(linhaRemovida, quantidade) {
    if (quantidade <= 0) {
        linhaRemovida.remove();
    }
}

