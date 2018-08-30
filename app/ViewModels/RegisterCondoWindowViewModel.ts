interface RegisterCondoWindowNavigator {
}

class RegisterCondoWindowViewModel extends BaseViewModel {
    name: string = '';
    address: string = '';
    number: string = '';
    neighborhood: string = '';
    cep: string = '';
    city: string;
    state: string = '';
    borndate: string = '';
    requestedName: string = '';
    requestedEmail: string = '';
    requestedMobile: string = '';
    font: string;
    units: number;

    private navigator: RegisterCondoWindowNavigator;

    constructor(navigator: RegisterCondoWindowNavigator) {
        super();
        super.init();
        this.navigator = navigator;
    }

    refresh() {
    }
   

    onButtonAccountClick(e) {
        if (e.currentTarget.value == '1') {
            $('#inputDocument').attr('placeholder', easypao.messages.index.documentIdPj);
            $('#lblDocumentId').text(easypao.messages.index.documentIdPj);
            $('#inputName').prop('required', true);
            $('#lblName').show();
            $('#inputName').show();
            $('#inputContactName').show();
        }
        else {
            $('#inputContactName').show();
            $('#inputName').hide();
            $('#inputName').prop('required', false);
            $('#lblName').hide();
            $('#inputDocument').attr('placeholder', easypao.messages.index.documentIdPf);
            $('#lblDocumentId').text(easypao.messages.index.documentIdPf);
        }
    }

    onButtonRegisterClick() {

        
        if ($("#registerCondoForm").kendoValidator().data("kendoValidator").validate()){

            var webapi = new WebApiHelper(sessionStorage.getItem('authToken'));
            var receive = $("#checkbox").is(":checked");
            var registerData = {
                name: $('#txtCondoName').val(),
                number: $('#txtCondoNumber').val(),
                address: $('#txtCondoAddress').val(),
                neighborhood: $('#txtCondoNeighborhood').val(),
                cep: $('#txtCondoPostalCode').val(),
                city: $('#txtCondoCity').val(),
                state: $('#txtCondoState').val(),
                requestedName: $('#txtNomeRequirement').val(),
                requestedEmail: $('#txtEmailRequirement').val(),
                requestedMobile: $('#txtPhoneRequirement').val(),
                font: $('#ddlCondoFont').val(),
                units: $('#txtNumberApart').val()
            };

            var login = webapi.registerCondo(registerData);

            this.resetWindow();
        }
        else
            kendo.ui.progress($("#registerCondoForm"), false);

    }

    public showCondoRegisterStatus(data) {
        var staticNotification = $("#Notification").kendoNotification({
            autoHideAfter: 15000, // 6 sec.                
            position: { top: 150 }
        }).data("kendoNotification");        

        if (data.status == 200) {
            //kendo.ui.progress(windowWidget.element, false);
            staticNotification.show('Condomínio foi salvo com sucesso! </br> Logo entraremos em contato.', "success");            

            $(this).parent().fadeOut(600);

            // close form overlay
            $('.form-box-overlay').fadeOut(600);

            // enable scroll
            $('body').removeClass('noscroll');
            $('#condoDiv').hide();
        }
        else {
            var response = JSON.parse(data.responseText);
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
                    if (response.message != '')
                        errorMessage = response.message;
                    else
            errorMessage = 'Erro ao salvar o condomínio! Por favor entrar em contato através do email contato@easypao.com.br';
                }
            }

            staticNotification.show(errorMessage, "error");

        }
    }

    resetWindow() {
        this.set('name', '');
        this.set('username', '');
        this.set('password', '');
        this.set('confirmPassword', '');
        this.set('number', '');
        this.set('address', '');
        this.set('neighborhood', '');
        this.set('cep', '');
        this.set('city', '');
        this.set('state', '');
        this.set('requestedName', '');
        this.set('requestedEmail', '');
        this.set('requestedMobile', '');
        this.set('font', '');
        this.set('units', 0);
        this.name = '';
        this.number = '';
        this.address = '';
        this.neighborhood = '';
        this.cep = '';
        this.city = '';
        this.state = '';
        this.requestedName = '';
        this.requestedEmail = '';
        this.requestedMobile = '';
        this.font = '';
        this.units = 0;
    }
}