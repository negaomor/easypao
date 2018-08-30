var easyuser: UserModel = JSON.parse(sessionStorage.getItem("easyuser"));
declare var easypao;

class IndexPage {
    registerCondoView: RegisterCondoDialog;
    mainHeaderBottonView: MainHeaderBottonView;

    render() {
       

        //var products = localStorage.getItem("products");
        
        //if (products == null) {
        //    var webapi = new WebApiHelper();
        //    webapi.getProducts('1');
        //    localStorage.setItem("lastupdate", new Date().toDateString());
        //}

        //kendo.culture("pt-BR");
        $.getJSON("http://www.easypao.com.br/files/lastupdate.html", function (json) {
            ; // this will show the info it in firebug console

            var lastupdate = localStorage.getItem("lastupdate");
            var products = localStorage.getItem("products");

            lastupdate = json.lastupdate == lastupdate;

            if (!lastupdate || products == null) {
                var webapi = new WebApiHelper();
                webapi.getProducts('1');
                localStorage.setItem("lastupdate", new Date().toDateString());
            }

        });

        //readTextFile("/Users/Documents/workspace/test.json", function (text) {
        //    var data = JSON.parse(text);
        //    console.log(data);
        //});

        //function readTextFile(file, callback) {
        //    var rawFile = new XMLHttpRequest();
        //    rawFile.overrideMimeType("application/json");
        //    rawFile.open("GET", file, true);
        //    rawFile.onreadystatechange = function () {
        //        if (rawFile.readyState === 4 && rawFile.status == "200") {
        //            callback(rawFile.responseText);
        //        }
        //    }
        //    rawFile.send(null);
        //}      
    }


    loadLocalization() {
        var currentLanguage = $.cookie("__language");
        if (currentLanguage == null)
            currentLanguage = "pt-BR";

        var data = [
            { text: "Brazil", value: "pt-BR", image: "/Content/images/flags/brazil.png" },
            { text: "USA", value: "en-US", image: "/Content/images/flags/usa.png" },
            { text: "Spanish", value: "es-ES", image: "/Content/images/flags/spain.png" }
        ];

        if (currentLanguage != null)
            var selectedLanguage = data.filter(function (data) { return (data.value == currentLanguage); })
        else
            var selectedLanguage = data.filter(function (data) { return (data[0]); })


        $("#flags").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            valueTemplate: '<span class="selected-value" style="background-image: url(' + selectedLanguage[0].image + ')"></span>',
            template: '<span class="selected-value" style="background-image: url(\'#:data.image#\')"></span>' +
            '<span class="selected-value" >#: data.text #<p>#: data.text #</p></span>',
            dataSource: data,
            height: 400
        });

        this.setLocalization(currentLanguage);
    }

    private emailConfirmation(location) {

        if (location.indexOf("confirmation") > 0) {
            var values = location.split("/");

            if (location.indexOf("confirmation") > 0) {
                var values = location.substring(location.indexOf("confirmation") + ("confirmation").length + 1);
                values = values.split("&");
                var userId = values[0].substring(values[0].indexOf("userId=") + ("userId=").length);
                var code = values[1].substring(values[1].indexOf("code=") + ("code=").length);
                var webapi = new WebApiHelper();
                var result = webapi.emailConfirmation(userId, code);
                if (result.data) {

                    alert(easypao.messages.index.emailconfirmation);
                }
                else
                    alert(easypao.messages.index.emailconfirmationfail);
            }
        }
    }

    private setLocalization(language) {
        var strMethodUrl = '/messages/setlocalization?language=' + language;

        $.ajax({
            type: "GET",
            url: strMethodUrl,
            dataType: "json",
            error: function (data) {
                //eval(data.responseText);
                //$('#signin').text(topograph.messages.index.signin);
                //$('#signup').text(topograph.messages.index.signup);
                //$('#more').text(topograph.messages.index.moreinformation);
                //$('#lblemail').text(topograph.messages.index.email);
                //$('#lblpassword').text(topograph.messages.index.password);
                //$('#lblregister').text(topograph.messages.index.signup);
                //$('#lblnotregistreded').text(topograph.messages.index.notregistreded);
                //$('#recoverypassword').text(topograph.messages.index.recoverypassword);
                //$('#systemanem').text(topograph.messages.index.systemanem);
                //$('#lbllgemail').text(topograph.messages.index.email);
                //$('#lbllogin').text(topograph.messages.index.signin);
                //$('#btnsignin').val(topograph.messages.index.signin);
                //$('#btnsignin').text(topograph.messages.index.signin);
                //$('#lblrememberme').text(topograph.messages.index.rememberme);
                //$('#lblloginTitle').text(topograph.messages.index.logintitle);



                //$('#inputForgotPasswordEmail').attr('placeholder', topograph.messages.index.email);
                //$('#inputEmail').attr('placeholder', topograph.messages.index.email);
                //$('#inputPassword').attr('placeholder', topograph.messages.index.password);


            },
            cache: false
        });
    }

    localizeObjects() {
        if (easypao != undefined) {
            $('#signin').text(easypao.messages.index.signin);
            $('#signup').text(easypao.messages.index.signup);
            $('#more').text(easypao.messages.index.moreinformation);
        }
    }

    public showRegisterCondoWindow() {
        if (this.registerCondoView == undefined)
            this.registerCondoView = new RegisterCondoDialog(this);

        this.registerCondoView.open();
    }

}


$(document).ready(() => {
    var page = new IndexPage();
    page.render();
    if (easyuser == null) { easyuser = new UserModel(); }

    $('.cupomsubscription').click(function (e) {
        if ($('#subscription').kendoValidator().data("kendoValidator").validate()) {
            var webapi = new WebApiHelper();
            var result = webapi.subscription($('#email').val());
            if (result)
                $(".newsletter-confirmacao").show();
        }
    })
});




