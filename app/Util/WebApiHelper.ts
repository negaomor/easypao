/**
 * Helper class for making RESTful calls to topoGRAPH.WebApi.
 */


class WebApiHelper {

    private authToken: string;

    /**
     * Initializes a new instance of the class.
     * @param authToken The authentication token to be used in the secured RESTful calls. This token can be obtained 
     *   through a call the to "WebApiHelper.login" method.
     */
    constructor(authToken?: string) {
        this.authToken = authToken == undefined ? sessionStorage.getItem('authToken') : authToken;
    }


    /**
     * Creates a new user.
     * @param name The user's full name 
     * @param userName The e-mail address which will be used as the username (login name).
     * @param password The password.
     * @param confirmPassword The confirmation of the password.
     */
    registerLogin(registerData): RegisterResult {
        kendo.ui.progress($("#registerDiv"), true);
        var result: RegisterResult = null;

        $.ajax({
            type: 'POST',
            async: true,
            url: 'api/authentic/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(registerData),
            beforeSend: function () {
                kendo.ui.progress($("#registerDiv"), true);
            },
            success: function (data: ILoginResultData, textStatus: string, jqXHR: JQueryXHR) {
                result = { jqXHR: jqXHR, data: data };
                kendo.ui.progress($("#registerDiv"), false);
                kendo.ui.progress($("#registerForm"), false);   

                //var page = new IndexPage();
                //page.showPausedMessage();
                var staticNotification = $("#Notification").kendoNotification({
                    autoHideAfter: 15000, // 6 sec.  
                    position: { top: 150 }
                }).data("kendoNotification");

                staticNotification.show('Usuário criado com sucesso! <br > Confirme o seu cadasto, acesse o seu email!', "success");

                $(this).parent().fadeOut(600);

                // close form overlay
                $('.form-box-overlay').fadeOut(600);

                // enable scroll
                $('body').removeClass('noscroll');
                $('#registerDiv').hide();
            },
        })
            .done((data: Object, textStatus: string, jqXHR: JQueryXHR) => {
                result = { jqXHR: jqXHR, data: data };
                kendo.ui.progress($("#registerDiv"), false);
                kendo.ui.progress($("#registerForm"), false);   
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                kendo.ui.progress($("#registerForm"), false);   
                kendo.ui.progress($("#registerDiv"), false);
                result = { jqXHR: jqXHR, data: null };
                var staticNotification = $("#Notification").kendoNotification({
                    autoHideAfter: 15000, // 6 sec.                
                    position: { top: 150 }
                }).data("kendoNotification");

                var response = JSON.parse(jqXHR.responseText);
                var errorMessage: string = '';

                for (var key in response.modelState) {
                    if (response.modelState.hasOwnProperty(key)) {
                        var messages: string[] = response.modelState[key];

                        for (var index = 0; index < messages.length; index++) {
                            errorMessage = (errorMessage == "" ? "" : errorMessage + "<br/>") + messages[index];
                            errorMessage = errorMessage.replace(".", "<br/>").replace(".", "<br/>").replace(".", "<br/>");
                        }
                    }
                }

                if (errorMessage == '') {
                    {
                        //if (response.message != '')
                        errorMessage = response;
                        //else
                        //    errorMessage = 'Register failed!';
                    }
                }
                // close form overlay
                $('.form-box-overlay').fadeOut(600);

                // enable scroll
                $('body').removeClass('noscroll');
                $('#registerDiv').hide();

                staticNotification.show(errorMessage, "error");
            });

        return result;
    }

    registerCondo(registerData): RegisterResult {

        var result: RegisterResult = null;

        $.ajax({
            type: 'POST',
            async: true,
            url: 'api/authentic/Condo',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(registerData),
            beforeSend: function () {
                kendo.ui.progress($("#registerCondo"), true);
                kendo.ui.progress($("#condoDiv"), true);
            },
            success: function (data: ILoginResultData, textStatus: string, jqXHR: JQueryXHR) {
                var condo = new RegisterCondoWindowViewModel(this);
                condo.showCondoRegisterStatus(jqXHR);
                result = { jqXHR: jqXHR, data: data };
                kendo.ui.progress($("#registerCondo"), false);
                kendo.ui.progress($("#condoDiv"), false);
            },
            error: function (jqXHR, errorThrown) {
                kendo.ui.progress($("#registerCondo"), false);
                kendo.ui.progress($("#condoDiv"), false);
                var condo = new RegisterCondoWindowViewModel(this);
                condo.showCondoRegisterStatus(jqXHR);
            }
        })
            .done((data: Object, textStatus: string, jqXHR: JQueryXHR) => {
                result = { jqXHR: jqXHR, data: data };
                kendo.ui.progress($("#registerCondo"), false);
                kendo.ui.progress($("#condoDiv"), false);
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
                kendo.ui.progress($("#registerCondo"), false);
                kendo.ui.progress($("#condoDiv"), false);
            });

        return result;
    }

    forgotPassword(email: string): ForgotPasswordResult {

        var result: ForgotPasswordResult = null;

        var data = { email: email };

        $.ajax({
            type: 'POST',
            async: false,
            url: this.domain() + 'ident/ForgotPassword',
            data: data,
        })
            .done((data: string, textStatus: string, jqXHR: JQueryXHR) => {
                result = { jqXHR: jqXHR, data: data };
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
            });

        return result;
    }

    /**
     * Authenticates as a user in the system and creates a authentication token.
     * @param userName The username (login name).
     * @param password The password.
     */
    login(userName: string, password: string): LoginResult {
        var navigator: LoginWindowNavigator;
        var page = new LoginWindowViewModel(navigator);
        var result: LoginResult = null;

        var data = {
            rememberMe: 'true',
            grant_type: 'password',
            userName: userName,
            password: password,
        };

        jQuery.support.cors = true;


        $.ajax({
            type: 'POST',
            async: true,
            url: 'api/authentic/Login',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            cache: false,
            dataType: "JSON",
            beforeSend: function () {
                //if ($(".pagamento").length > 0)
                    kendo.ui.progress($(document.body), true);
                //else {
                //    kendo.ui.progress($("#login-co"), true);
                //    kendo.ui.progress($("#login-form"), true);
                //}
            },
            success: function (data: ILoginResultData, textStatus: string, jqXHR: JQueryXHR) {                
                sessionStorage.setItem('easyuser', JSON.stringify(data));
                page.getAccess(data, textStatus);
                result = { jqXHR: jqXHR, data: data };

            },
            error: function (jqXHR, errorThrown) {
                //page.getAccess(null, jqXHR);

                kendo.ui.progress($("#login-form"), false);
                kendo.ui.progress($("#checkout"), false);
                kendo.ui.progress($("#checkout-wrap"), false);
                kendo.ui.progress($("#app-root"), false);
                kendo.ui.progress($(".pagamento"), false);
                kendo.ui.progress($(document.body), false);

                var staticNotification = $("#Notification").kendoNotification({
                    appendTo: "#appendto",
                    autoHideAfter: 15000, // 6 sec.  
                    position: { top: 150 }
                }).data("kendoNotification");

                staticNotification.show('Usuário ou senha incorretos!', "error");

            }
            //beforeSend: function (jqXHR) {
            //    jqXHR.overrideMimeType('text/xml;charset=iso-8859-1');

            //    jqXHR.setRequestHeader("Access-Control-Allow-Origin", "*");
            //    jqXHR.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //    jqXHR.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, HEAD");
            //}
        });
        //.done((data: ILoginResultData, textStatus: string, jqXHR: JQueryXHR) => {
        //    result = { jqXHR: jqXHR, data: data };
        //})
        //.fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
        //    result = { jqXHR: jqXHR, data: null };
        //});

        return result;
    }

    getUser(): GetUserResult {

        var result: GetUserResult = null;

        $.ajax({
            type: 'GET',
            async: false,
            url: 'api/ident/UserInfo',
            contentType: 'application/json; charset=utf-8',
            headers: this.buildBearerHeader()
        })
            .done((data: UserModel, textStatus: string, jqXHR: JQueryXHR) => {
                result = { jqXHR: jqXHR, data: data };
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
            });

        return result;

    }

    emailConfirmation(userId: string, code: string): WebApiResult {
        var result;
        $.ajax({
            type: 'POST',
            async: false,
            url: this.domain() + 'ident/ConfirmEmail',
            data: {
                userid: userId,
                code: code,
            },
            headers: this.buildBearerHeader()
        })
            .done((data: Object, textStatus: string, jqXHR: JQueryXHR) => {
                result = { jqXHR: jqXHR, data: data };
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
            });

        return result;
    }

    calculateOrder(order: Object): OrderResult {
        var result;
        $.ajax({
            type: 'POST',
            async: true,
            url: '/api/order/calculate',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(order),
            headers: this.buildBearerHeader(),
            beforeSend: function () {
                kendo.ui.progress($(document.body), true);
            },
            success: function (orderResult) {
                var page = new ProductsView(this);
                page.showCalculatedProducts(orderResult);
                //$('.item-entrega soma').show();
                //$('.total-soma').html("R$ " + orderResult.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })); 
                //$('.quant-soma').html(orderResult.quantidade + " unidade(s)");                
                kendo.ui.progress($(document.body), false);
            },
            error: function (textStatus, errorThrown) {
                alert(textStatus.statusText);//doesnt goes here                
                kendo.ui.progress($(document.body), false);
            }

        })
        //.done((data: Object, textStatus: string, jqXHR: JQueryXHR) => {
        //    result = { jqXHR: jqXHR, data: data };
        //})
        //.fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
        //    result = { jqXHR: jqXHR, data: null };
        //});

        return result;
    }

    getProducts(category: string): GetProductsResult {
        var result = new GetProductsResult();

        $.ajax({
            type: 'GET',
            async: true,
            url: '/api/api/product/getProducts/',
            headers: this.buildBearerHeader(),
            cache: true,
            beforeSend: function (jqXHR) {
                kendo.ui.progress($("#shop-wrap"), true);                
            },
            success: function (orderResult) {
                var page = new ProductsView(this);
                localStorage.setItem("products", JSON.stringify(orderResult));
                page.showProductsContainer(orderResult, category);
                page.wireNavigationEvents(page);
            },
            error: function (textStatus, errorThrown) {
                result = { jqXHR: textStatus, data: null };
                kendo.ui.progress($("#shop-wrap"), false);
            }
        })
            .done((data: ProductModel, textStatus: string, jqXHR: JQueryXHR) => {
                result = { jqXHR: jqXHR, data: data };
                kendo.ui.progress($("#shop-wrap"), false);                
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
                kendo.ui.progress($("#shop-wrap"), false);                
            });

        return result;
    }

    submitOrder(orderList) {
        var result = new GetProductsResult();

        $.ajax({
            type: 'POST',
            async: true,
            url: '/api/order/submitOrder/',
            contentType: 'application/json; charset=utf-8',
            headers: this.buildBearerHeader(),
            data: JSON.stringify(orderList),
            beforeSend: function () {
                kendo.ui.progress($(document.body), true);
                $(this).fadeIn(600);
            },
            success: function (code)
            {
                //window.location.href = urlPagSeguro;
                $("#codpagseguro").val(code);
                $('#pagseguorform').submit();
            },
            error: function (textStatus, errorThrown) {
                result = { jqXHR: textStatus, data: null };
            }
        })
            .done((data: ProductModel, textStatus: string, jqXHR: JQueryXHR) => {
                result = { jqXHR: jqXHR, data: data };
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
            });

        return result;
    }  

    productAnalystic(data) {
        var result;

        $.ajax({
            type: 'POST',
            async: true,
            url: 'api/maintenance/SetDataToAnalisy/',
            data: data,
            headers: this.buildBearerHeader(),
            success: function (data: boolean, textStatus: string, jqXHR: JQueryXHR) {
                result = { jqXHR: jqXHR, data: data };
            },
        })
            .done((data: ProductModel, textStatus: string, jqXHR: JQueryXHR) => {
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
            });

        return result;
    }

    subscription(input) {
        var result;

        var data = { email: input };

        $.ajax({
            type: 'POST',
            async: false,
            url: 'api/Notification/SubscriptionNewsLetter/',
            data: data,
            headers: this.buildBearerHeader(),
            success: function (data: boolean, textStatus: string, jqXHR: JQueryXHR) {
                result = { jqXHR: jqXHR, data: data };
            },
        })
            .done((data: ProductModel, textStatus: string, jqXHR: JQueryXHR) => {
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                result = { jqXHR: jqXHR, data: null };
            });

        return result;
    }
    
    purchase(registerData): RegisterResult {

        var result: RegisterResult = null;
        var url;

        if (registerData.express)
            url = 'api/Purchase/PurchaseExpress';
        else
            url = 'api/authentic/Register';


        $.ajax({
            type: 'POST',
            async: true,
            url: url,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(registerData),
            beforeSend: function () {                                            
                kendo.ui.progress($(document.body), true)                
            },
            success: function (code: string, textStatus: string, jqXHR: JQueryXHR) {
                
                $("#codpagseguro").val(code);
                $('#pagseguorform').submit();
                $('.pagseguro-button gray-theme.close').click(function () {
                    alert('Fechado');
                });                  
                var amount = "0,00";
                $.each(cartItens, function () {                    
                    amount = this.amount;                    
                });  
                try { nvg32826.conversion(amount); } catch (err) { }            
            },
        })
            .done((data: Object, textStatus: string, jqXHR: JQueryXHR) => {
                $('.pagseguro-button gray-theme.close').click(function () {
                    alert('Fechado');
                });
                kendo.ui.progress($("#cart"), false)  
                kendo.ui.progress($(document.body), false)                
                $('#submitOrder').kendoButton().data("kendoButton").enable(true);                                         
            })
            .fail((jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => {
                kendo.ui.progress($("#cart"), false)                                           
                kendo.ui.progress($(document.body), false)                
                result = { jqXHR: jqXHR, data: textStatus };                
                $('#submitOrder').kendoButton().data("kendoButton").enable(true);
                Message.showMessage("appendtoregister","Confira corretamente as suas informações enviadas.","error");
            });

        return result;
    }

    /**
     * Build the authentication header to be sent in the HTTP requests.
     */
    private buildBearerHeader() {
        return { Authorization: 'Bearer ' + this.authToken };
    }

    private domain() {
        var urlWebApi = $("#hiddenUrlWebApi").val();

        return urlWebApi;
    }
}

/**
 * Represents the result of a RESTful calls to topoGRAPH.WebApi.
 */
interface IWebApiResult {
    jqXHR: XMLHttpRequest;
    data: Object;
}

/**
 * Represents the generic result of a RESTful calls to topoGRAPH.WebApi.
 */
abstract class WebApiResult implements IWebApiResult {
    jqXHR: XMLHttpRequest;
    data: Object;
}

class RegisterResult extends WebApiResult {
}

interface ILoginResultData {
    status: string;
    access_token: string;
    userName: string;
    name: string;
    lastname: string;
    email: string;
    mobile: string;
    apartment: string;
    building: string;
    condo: string;
    city: string;
    state: string;
}

class ForgotPasswordResult extends WebApiResult {
    data: string;
}
class LoginResult extends WebApiResult {
    data: ILoginResultData;
}
class OrderResult extends WebApiResult {
    data: Order;
}
class GetUserResult extends WebApiResult {
    data: UserModel;
}

class GetProductsResult extends WebApiResult {
    data: ProductModel;
}

