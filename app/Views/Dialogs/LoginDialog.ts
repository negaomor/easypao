class LoginDialog extends BaseView {

    protected viewModel: LoginWindowViewModel;
    private loginWindow: kendo.ui.Window;

    constructor(navigator: LoginWindowNavigator) {
        super('./Content/templates/LoginWindowView.tmpl.html',
            '#template-login-window-view', new LoginWindowViewModel(navigator));
        //this.viewModel = new LoginWindowViewModel(navigator);
    }

    renderInternals() {
        $('#forgotPasswordform').hide();
        this.createLoginWindow();
    }

    open() {
        if (this.loginWindow == undefined)
            this.createLoginWindow();

        this.loginWindow.open().center();
        $('#inputEmail').focus();
    }

    close() {
        if (this.loginWindow == undefined)
            this.createLoginWindow();

        this.loginWindow.close();
    }

    private createLoginWindow() {
        var loginWindowHeight = 240;
        var loginWindowWidth = 422;

        this.loginWindow = $('#logInModalWindow').kendoWindow({
            resizable: false,
            draggable: false,
            actions: ['close'],
            width: loginWindowWidth,
            minHeight: loginWindowHeight,
            modal: true,
            scrollable: false,
            visible: false,
            //title: 'Informe seu dados',
            position: {
                top: (window.innerHeight - (loginWindowHeight + 200)) / 2,
                left: (window.innerWidth - (loginWindowWidth)) / 2,
            },
            open: () => {
                this.viewModel.resetWindow();

                $(document).bind('keydown', (e) => {
                    if (e.keyCode == kendo.keys.ENTER) {
                        this.viewModel.onButtonLoginClick();
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

        //Remove close button
        //$('.k-header').css('margin-left', '400px');
        //$('.k-window-titlebar').removeClass("k-header");      
        //$('.k-window-titlebar').removeClass("k-window-titlebar");      
        //$('.k-widget.k-window').css('padding-top', '20px');
        //End Remove close button

        $('#inputEmail')
            .focus(() => {
                // the password text will not be selected when the onFocus even occurs unless we use the setTimeout function
                setTimeout(() => {
                    $('#inputEmail').select();
                });
            });

        $('#inputPassword')
            .focus(() => {
                // the password text will not be selected when the onFocus even occurs unless we use the setTimeout function
                setTimeout(function () {
                    $('#inputPassword').select();
                });
            });
    }

}

