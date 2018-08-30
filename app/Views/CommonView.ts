class CommonView {

    renderInternals() {
        var easyuser = JSON.parse(sessionStorage.getItem("easyuser"));
        if (easyuser !== null) {
            $('#loginaction').text('SAIR');
            $('#login').find('p').text('')
            $('#login').find('p').append('<p>Olá <a href="#">' + easyuser.name + '</a></p><a href="">Meus Pedidos </a><ul><li><p>Meus Pedidos </p></li><li><p>Minha Conta </p></li></ul>')
        }

        this.fillTotal();
        this.wireNavigationEvents();
    }

    fillTotal() {
        var myTotal = 0;
        var myQtd = 0;
        for (var i = 0, len = cartItens.length; i < len; i++) {
            myTotal += cartItens[i].amount;
            myQtd += cartItens[i].qtd;
        }

        $('.total').empty();
        $('.total').append('Total:<span>R$ ' + myTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '</span>');
        $('li p span')[0].innerHTML = myQtd.toString();
        $('li p span')[1].innerHTML = 'R$ ' + myTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        $('.cart').text(myQtd)
    }
    wireNavigationEvents() {

        //$.get('./Content/templates/CondosRegister.tmpl.html', function (value) {
        //    //var template = kendo.template(value);
        //    $('body').append(value);
        //});            

      
    }

}
$(document).ready(() => {
    var page = new CommonView();
    page.renderInternals();
});