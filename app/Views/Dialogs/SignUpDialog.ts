class SignUpDialog extends BaseView {

    protected viewModel: RegisterWindowViewModel;
    private registerWindow: kendo.ui.Window;

    constructor(navigator: RegisterWindowNavigator) {
        //this.viewModel = new RegisterWindowViewModel(navigator);
        super('./Content/templates/RegisterWindowView.tmpl.html',
            '#template-register-window-view',
            new RegisterWindowViewModel(navigator));
    }

    renderInternals() {
        this.createRegisterWindow();
        $('#txtMobile').kendoMaskedTextBox({ mask: "(99) 99999-9999" });
        $('#txtDocumentId').kendoMaskedTextBox({ mask: "999.999.999-99" });
        $('#txtBirthday').kendoDatePicker({ culture:"pt-BR"});
        

        $('#inputName').attr('placeholder', 'Organization');
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
        var windowHeight = window.innerHeight / 2.5;
        var windowWidth = window.innerWidth / 2.5;
        $('#closeform').hide();
        $('#companyform').hide();

        this.registerWindow = $('#registerModalWindow').kendoWindow({
            resizable: false,
            draggable: false,
            actions: ['close'],
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
                        var dialog = $("#registerModalWindow").data("kendoWindow");
                        dialog.close();
                    }
                });
            },
        }).data('kendoWindow');
    }

}