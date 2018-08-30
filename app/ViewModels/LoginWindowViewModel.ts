interface LoginWindowNavigator {
    showRegisterWindow();
    showForgotPasswordWindow();
}

class LoginWindowViewModel extends BaseViewModel {
    username: string = '';
    password: string = '';
    loggedIn: boolean = true;
    userMessageLogin: string = '';
    private navigator: LoginWindowNavigator;
    private forgotPasswordNavigator: ForgotPasswordWindowNavigator;
    public email: string = '';

    constructor(navigator: LoginWindowNavigator) {
        super();
        super.init();
        this.navigator = navigator;

    }


    refresh() {
    }

    onButtonLoginClick() {
      
        if ($("#login-form").kendoValidator().data("kendoValidator").validate()) {

            this.logIn($('#txtUserName').val(), $('#txtPassword').val());
        }
        else {
            kendo.ui.progress($(document.body), true);
        }



    }

    onButtonForgotPasswordClick() {
        if ($("#forgotPasswordform").kendoValidator().data("kendoValidator").validate()) {
            var webapi = new WebApiHelper('');
            var email = $('#inputForgotPasswordEmail').val();
            var staticNotification = $("#staticNotification").kendoNotification({
                appendTo: "#appendto", autoHideAfter: 10000
            }).data("kendoNotification");

            if (email != '') {
                webapi.forgotPassword(email);
                staticNotification.show('Sent email successfully!', "sucess");
            }
            else {
                staticNotification.show('emails is required', "erro");
            }

            var dialog = $("#logInModalWindow").data("kendoWindow");
            setTimeout(function () {
                dialog.close();
            }, 10000);
        }
    }

    resetWindow() {
        this.set('username', '');
        this.set('password', '');
        this.set('userMessageLogin', '');
        $("#inputEmail").kendoValidator().data("kendoValidator").hideMessages();
        $("#inputPassword").kendoValidator().data("kendoValidator").hideMessages();

    }

    showRegisterWindow(e: kendo.ui.ButtonClickEvent) {
        this.navigator.showRegisterWindow();
        e.preventDefault();
    }

    showLoginWindow() {
        $('#forgotPasswordform').hide();
        $('#loginform').show();
    }

    showForgotPasswordWindow() {
        $('#forgotPasswordform').show();
        $('#loginform').hide();
    }

    private logIn(userName: string, password: string) {

        var webapi = new WebApiHelper(sessionStorage.getItem('authToken'));
        webapi.login(userName, password);
    }

    getAccess(data: ILoginResultData, status) {
        if (status == 'success') {

            var inputWebApiToken = $('<input>').attr({
                type: 'hidden',
                name: '__WebApiAuthenticationToken'
            });

            inputWebApiToken.val(status.access_token);
            inputWebApiToken.appendTo('#formMain');
            var easyuser = JSON.parse(sessionStorage.getItem('easyuser'));
            //$('#loginmenu').text('Meus Pedidos');
            $('#loginaction').text('SAIR');
            $('#login').find('p').text('')
            $('#login').find('p').append('<p>Olá <a href="#">' + easyuser.name + '</a></p><a href="">Meus Pedidos </a><ul><li><p>Meus Pedidos </p></li><li><p>Minha Conta </p></li></ul>');
            
            if (easyuser != undefined) {
                $('#guest-checkout').hide();
                $('#confirm-checkout').show();
                $('#deliverydata').show();
                $('#txtname').val(easyuser.name);
                $('#txtsurname').val(easyuser.lastname);
                $('#txtemail').val(easyuser.email);
                $('#txtphone').val(easyuser.mobile);
                $('#txtapartament').val(easyuser.apartment);
                $('#txtbuilding').val(easyuser.building);
                $('#txtcity').val(easyuser.city);
                $('#txtcondo').val(easyuser.state);
            }

            $(this).parent().fadeOut(600);

            // close form overlay
            $('.form-box-overlay').fadeOut(600);

            // enable scroll
            $('body').removeClass('noscroll');
            $('#loginDiv').hide();
            kendo.ui.progress($("#login-form"), false);

            if ($("#btnlogincheckout").length > 0) {
                $(".login-form").hide();
                var purchase = new PurchaseModel();

                var address = new AddressModel();
                address.condominioId = easyuser.cityId;
                address.apartment = easyuser.apartament;
                address.tower = easyuser.building;
                address.mobile = easyuser.mobile;
                purchase.address = address;

                var cartItens = JSON.parse(sessionStorage.getItem("cartItens"));
                purchase.products = new Array();
                $.each(cartItens, function () {
                    var product = new ProductModel();
                    product.productId = this.productId;
                    product.name = this.name;
                    product.qtd = this.qtd;
                    product.amount = this.amount;
                    purchase.products.push(product);
                });

                var webapi = new WebApiHelper();
                purchase.name = easyuser.name;
                purchase.email = easyuser.email;
                purchase.lastname = easyuser.lastname;
                purchase.express = true;
                //purchase.deliveryDate = $("#deliveryDate").val();
                //purchase.deliveryTime = $("#deliveryTime").kendoComboBox().val();
                //purchase.discount = sessionStorage.getItem("discountValue") == null ? false : true;

                webapi.purchase(purchase);
                sessionStorage.removeItem("cartItem");
                sessionStorage.removeItem("easyuser");
                var page = new CommonView();
                page.fillTotal();
            }

        }
        else {
            var staticNotification = $("#Notification").kendoNotification({
                appendTo: "#appendto", autoHideAfter: 15000, // 6 sec.                
                hideOnClick: true
            }).data("kendoNotification");

            var error = JSON.parse(status.responseText);
            if (error == "")
                error = "Login failed!"
            else {
                if (status.responseText == undefined) {
                    error = status.statusText;
                }
                else if (status.status == 404) {
                    error = "Network Error";
                }
                //else if (result.jqXHR.responseText.indexOf("invalid_grant") > 0) {
                //    error = JSON.parse(result.jqXHR.responseText).error_description;
                //}
                else {
                    error = JSON.parse(status.responseText);
                }
            }

            staticNotification.show(error, "error");

        }
        kendo.ui.progress($("#login-form"), false);
        kendo.ui.progress($(".pagamento"), false);
        kendo.ui.progress($(document.body), false);

    }
}

$(document).ready(() => {
    $(function () {

        function displayLoading(target) {
            var element = $(target);
            kendo.ui.progress(element, true);
            setTimeout(function () {
                kendo.ui.progress(element, false);
            }, 2000);
        }

        $("#btnsignin").click(function () {
            displayLoading("#logInModalWindow");
        });

        $(document).bind('keydown', (e) => {
            if (e.keyCode == kendo.keys.ENTER) {
                displayLoading(document.body);
            }
        });

        $('#inputEmail').focus();

    });
});