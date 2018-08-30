class PurchaseDialog extends BaseView {

    protected viewModel: RegionViewModel;
    private purchaseWindow: kendo.ui.Window;

    constructor() {
        super('../Content/templates/PurchaseWindowView.tmpl.html',
            '#template-purchase-view', new RegionViewModel());
    }

    renderInternals() {
        this.createPurchaseWindow();
        $('.deliveryDate').text('Data de entrega: terça-feira, ' + new Date().getDate() + ' de ' + new Date().getMonth() + ' de 2016.');
    }

    open() {
        if (this.purchaseWindow == undefined)
            this.createPurchaseWindow();

        this.purchaseWindow.open().center();
    }

    close() {
        this.purchaseWindow.close();
    }

    private createPurchaseWindow() {
        var loginWindowHeight = window.innerHeight;
        var loginWindowWidth = window.innerWidth;

        this.purchaseWindow = $('#purchase-dialog').kendoWindow({
            actions: ['close'],
            width: loginWindowWidth / 2,
            minHeight: loginWindowHeight / 2,
            modal: true,
            visible: false,          
            close: () => {
                $(document).bind('keydown', (e) => {
                    if (e.keyCode == kendo.keys.ESC) {
                        var dialog = $("#purchase-dialog").data("kendoWindow");
                        dialog.close();
                    }
                });
            },
        }).data('kendoWindow');

    }

}

