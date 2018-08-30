interface RegisterWindowNavigator {
    showLoginWindow();
    closeRegisterWindow();
}

class RegisterWindowViewModel extends BaseViewModel {
    name: string = '';
    lastname: string = '';
    email: string = '';
    mobile: string = '';
    documentId: string = '';
    password: boolean = false;
    confirmpassword: string = '';
    birthday: string = '';
    city: string = '';
    state: string = '';
    condo: string = '';
    apartament: string = '';
    building: string = '';
    font: string = '';

    private navigator: RegisterWindowNavigator;

    constructor(navigator: RegisterWindowNavigator) {
        super();
        super.init();
        this.navigator = navigator;
    }

    refresh() {        
    }

    showLoginWindow(e: kendo.ui.ButtonClickEvent) {
        this.navigator.showLoginWindow();
        e.preventDefault();
    }

    closeLoginWindow(e: kendo.ui.ButtonClickEvent) {
        e.preventDefault();
        this.navigator.closeRegisterWindow();
    }
   
    onButtonRegisterClick() {




         if ($('#ddlCondo').val() == "") {
            $("#registerForm").kendoValidator().data("kendoValidator").validate();
            kendo.ui.progress($("#registerForm"), false);return;
        }
       
        if ($("#registerForm").kendoValidator().data("kendoValidator").validate()) {            

            var webapi = new WebApiHelper(sessionStorage.getItem('authToken'));
            var receive = $("#checkbox").is(":checked");
            var addressVm = new AddressModel();
            addressVm.mobile = $('#txtMobile').val();
            addressVm.apartment = $('#txtApartament').val();
            addressVm.tower = $('#txtBuilding').val();
            addressVm.condominioId = $('#ddlCondo').val();

            var registerData = {
                name: $('#txtName').val(),
                lastname: $('#txtLastName').val(),
                email: $('#txtEmail').val(),
                documentId: $('#txtDocumentId').val(),
                birthDay: $('#txtBirthday').val(),
                city: $('#txtCity').val(),
                state: $('#txtState').val(),
                password: $('#registerPassword').val(),
                confirmpassword: $('#txtConfirmPassword').val(),
                font: $('#ddlFont').val(),
                address: addressVm
            };

            var login = webapi.registerLogin(registerData);

            //var staticNotification = $("#registerNotification").kendoNotification({
            //    appendTo: "#appendtoregister", autoHideAfter: 15000, // 6 sec.                
            //    hideOnClick: true
            //}).data("kendoNotification");


            //if (login.data != null) {
            //    kendo.ui.progress(windowWidget.element, false);
            //    staticNotification.show('User created successfully! </br> Check your email to validate.', "success");

            //    var dialog = $("#registerModalWindow").data("kendoWindow");
            //    setTimeout(function () {
            //        dialog.close();
            //    }, 6000);
            //}
            //else {
            //    var response = JSON.parse(login.jqXHR.responseText);
            //    var errorMessage: string = '';


            //    for (var key in response.modelState) {
            //        if (response.modelState.hasOwnProperty(key)) {
            //            var messages: string[] = response.modelState[key];

            //            for (var index = 0; index < messages.length; index++) {
            //                errorMessage = (errorMessage == "" ? "" : errorMessage + "<br/>") + messages[index];
            //                errorMessage = errorMessage.replace(".", "<br/>").replace(".", "<br/>").replace(".", "<br/>");
            //            }
            //        }
            //    }

            //    if (errorMessage == '') {
            //        {
            //            if (response.message != '')
            //                errorMessage = response.message;
            //            else
            //                errorMessage = 'Register failed!';
            //        }
            //    }

            //    staticNotification.show(errorMessage, "error");

            //}
            this.resetWindow();
        }
        else {
            kendo.ui.progress($("#registerForm"), false);   
            kendo.ui.progress($("#registerDiv"), false);     
        }
                
    }

    resetWindow() {
        this.set('name', '');
        this.set('username', '');
        this.set('password', '');
        this.set('confirmPassword', '');
        this.set('userMessageRegister', '');
    }
}