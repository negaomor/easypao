interface ForgotPasswordWindowNavigator {
    showRegisterWindow();
}

class ForgotPasswordWindowViewModel extends BaseViewModel {
    email: string = '';
    private navigator: ForgotPasswordWindowNavigator;


    constructor(navigator: ForgotPasswordWindowNavigator) {
        super();
        super.init();
        this.navigator = navigator;

    }

    refresh() {
    }

    onButtonLoginClick() {
        var windowWidget = $("#logInModalWindow").data("kendoWindow");
        kendo.ui.progress(windowWidget.element, true);
        if ($("#loginform").kendoValidator().data("kendoValidator").validate()) {
            this.forgotPassword(this.email);
        }

        kendo.ui.progress(windowWidget.element, false);
    }

    resetWindow() {
        this.set('email', '');
    }


    private forgotPassword(email: string) {
        var webapi = new WebApiHelper('');

        var result = webapi.forgotPassword(email);

        if (result.data != null) {
            var inputWebApiToken = $('<input>').attr({
                type: 'hidden',
                name: '__WebApiAuthenticationToken'
            });

            $('#formMain').submit();
        }
        else {
            this.set('userMessageLogin', JSON.parse(result.jqXHR.responseText).error_description);
            var staticNotification = $("#staticNotification").kendoNotification({
                appendTo: "#appendto"
            }).data("kendoNotification");

            var d = new Date();
            staticNotification.show(JSON.parse(result.jqXHR.responseText).error_description, "error");
        }
    }



}