class CartDialog extends BaseView {

    constructor(public viewmodel: ProductsViewModel) {
        super('./Content/templates/CartDialogView.tmpl.html',
            '#template-go-to-cart-dialog', viewmodel);
    }

    renderInternals() {
        $('.gotocart').click(function () {
            location.href = "cart.html";
        });
        $('.keepon').click(function () {
            $('#dialogCart').data("kendoWindow").close();
        });
    }

}

