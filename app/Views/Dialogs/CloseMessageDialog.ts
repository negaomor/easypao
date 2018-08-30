class CloseMessageDialog extends BaseView {

    protected viewModel: RegionViewModel;
    private messageCloseWindow: kendo.ui.Window;

    constructor() {
        super('../Content/templates/CloseMessageWindowView.tmpl.html',
            '#template-message-close-view', new RegionViewModel());
    }

    renderInternals() {
        this.createLoginWindow();
    }

    open() {
        this.messageCloseWindow.open();
    }

    close() {
        this.messageCloseWindow.close();
    }

    private createLoginWindow() {
        var loginWindowHeight = 240;
        var loginWindowWidth = 600;

        this.messageCloseWindow = $('#message-close-dialog').kendoWindow({
            actions: ['close'],
            width: loginWindowWidth,
            minHeight: loginWindowHeight,
            modal: true,
            visible: false,
            //title: 'Informe seu dados',
            position: {
                top: (window.innerHeight - (loginWindowHeight ) + 200) / 2,
                left: (window.innerWidth - (loginWindowWidth)) / 2,
            },
            close: () => {
                $(document).bind('keydown', (e) => {
                    if (e.keyCode == kendo.keys.ESC) {
                        var dialog = $("#message-close-dialog").data("kendoWindow");
                        dialog.close();
                    }
                });
            },
        }).data('kendoWindow');

    }

}

