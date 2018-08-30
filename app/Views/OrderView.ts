class OrderView extends BaseView {

    private app = new Application();

    constructor(public viewModel: OrderViewModel) {
        super('./Content/templates/OrderView.tmpl.html',
            '#template-order-view',
            viewModel);
    }

    renderInternals() {        

    }


}