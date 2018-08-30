class RegisterCondoDialog extends BaseView {

    protected viewModel: RegisterWindowViewModel;
    private registerWindow: kendo.ui.Window;

    constructor(navigator: RegisterCondoWindowNavigator) {
        //this.viewModel = new RegisterWindowViewModel(navigator);
        super('./Content/templates/RegisterCondoWindowView.tmpl.html',
            '#template-register-condo-window-view', new RegisterCondoWindowViewModel(navigator));
    }

    renderInternals() {
        this.createRegisterWindow();       
        $('#txtTelefoneSolicitante').kendoMaskedTextBox({ mask: "(99) 99999-9999"});
        $('#txtCep').kendoMaskedTextBox({ mask: "99999-999"});
    }

    open() {
        if (this.registerWindow == undefined)
            this.createRegisterWindow();

        this.registerWindow.open().center();
    }

    close() {
        this.registerWindow.close();
  
    }

    private createRegisterWindow() {
        var windowHeight = window.innerHeight / 3;
        var windowWidth = 385
        if (window.innerWidth > 410) { windowWidth = window.innerWidth};
      
        this.registerWindow = $('#registerCondoModalWindow').kendoWindow({
            resizable: false,
            draggable: false,
            actions: false,            
            minHeight: windowHeight,
            width: windowWidth,
            
            modal: true,
            visible: false,
            scrollable: false,
            //title: 'Criar conta',           
            open: () => {
                this.viewModel.resetWindow();
                $(document).bind('keydown', (e) => {
                    if (e.keyCode == kendo.keys.ENTER) {
                        this.viewModel.onButtonRegisterClick();
                    }
                });
            },
            close: () => {
                $(document).bind('keydown', (e) => {
                    if (e.keyCode == kendo.keys.ESC) {
                        var dialog = $("#registerCondoModalWindow").data("kendoWindow");
                        dialog.close();
                    }
                });
            },
        }).data('kendoWindow');
    }

}