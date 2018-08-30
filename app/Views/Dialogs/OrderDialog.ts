class OrderDialog extends BaseView {

    protected viewModel: OrderViewModel;
    private orderWindow: kendo.ui.Window;

    constructor() {
        super('../Content/templates/OrderWindowView.tmpl.html',
            '#template-order-view', new OrderViewModel());
    }

    renderInternals() {
        //$('#forgotPasswordform').hide();
        this.createLoginWindow();
    }

    open() {
        if (this.orderWindow == undefined)
            this.createLoginWindow();

        this.orderWindow.open();
        this.orderWindow.maximize();
    }

    close() {
        this.orderWindow.close();
    }

    private createLoginWindow() {
        var loginWindowHeight = window.innerHeight / 1.5;
        var loginWindowWidth = window.innerWidth / 1.5;

        this.orderWindow = $('#order-dialog').kendoWindow({
            resizable: false,
            draggable: true,
            actions: ['close'],
            //width: loginWindowWidth,
            //minHeight: loginWindowHeight,
            modal: true,
            visible: false,
            //title: 'Informe seu dados',
            
            position: {
                top: (window.innerHeight - (loginWindowHeight)) / 2,
                left: (window.innerWidth - (loginWindowWidth)) / 2,
                
            },
            open: () => {
                //this.viewModel.resetWindow();

                //$(document).bind('keydown', (e) => {
                //    if (e.keyCode == kendo.keys.ENTER) {
                //        this.viewModel.onButtonLoginClick();
                //    }
                //});
            },
            close: () => {
                $(document).bind('keydown', (e) => {
                    if (e.keyCode == kendo.keys.ESC) {
                        var dialog = $("#registerModalWindow").data("kendoWindow");
                        dialog.close();                       
                    }
                });
            },
        }).data('kendoWindow');
        this.orderWindow.resize(true);
       
        
        //Remove close button
        //$('.k-header').css('margin-left', '400px');
        //$('.k-window-titlebar').removeClass("k-header");      
        //$('.k-window-titlebar').removeClass("k-window-titlebar");      
        //$('.k-widget.k-window').css('padding-top', '20px');
        //End Remove close button

    }

}

