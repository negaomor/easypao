"use strict ";
$(function () {
    var newcity;

    $.get('./Content/templates/CondosRegister.tmpl.html', function (value) {
        //var template = kendo.template(value);
        // insert forms
        newcity = value;

        wireNavigationEvents();
    });

    function wireNavigationEvents() {

        var overlay = $([
            '<!--LOGIN REGISTER RESET FORMS-->',
            '<section class="form-box-overlay"></section>'
        ].join("\n")),
            loginForm = $([
                '<!--LOGIN FORM-->',
                '<div id="loginDiv">',
                '<div>' +
                '<span id="staticLoginNotification"></span>' +
                '<div id="appendtoLogin" class="demo-section k-content text-justify"></div>' +
                '</div>',
                '<article class="form-box login">',
                '<a href="#" class="form-close">',
                '<img src="images/form-close.png" alt="close">',
                '</a>',

                '<form id="login-form">',
                '<!--ERROR MSGS-->',
                '<label for="login_user" class="error">Wrong username or password...</label>',
                '<!--/ERROR MSGS-->',
                '<input type="text" name="Login" id="txtUserName" placeholder="Usuário..." required>',
                '<input type="password" name="Senha" id="txtPassword" placeholder="Senha..." required>',
                '<input type="checkbox" name="login_remember" id="login_remember">',
                '<label for="login_remember">Mantenha-me conectado</label>',
                '</form>',
                '<a href="#" class="popup reset">Esqueci minha senha?</a>',
                '<input type="submit" id="loginUser" value="Acessar" class="loginUser" >',
                '<p>Não sou assinante EasyPão?<br><a href="#" class="popup register">Cadastre-se Agora!</a></p>',
                '</article>',
                '</div>',
                '<!--/LOGIN FORM-->'
            ].join("\n")),
            registerForm = $([
                '<!--REGISTER FORM-->',
                '<div id="registerDiv">',
                '<div>',
                '<span id="Notification"></span>',
                '<div id="appendto" class="demo-section k-content text-justify"></div>',
                '</div>',
                '<article class="form-box register" style="z-index:99999999">',
                '<a href="#" class="form-close">',
                '<img src="images/form-close.png" alt="close">',
                '</a>',
                '<div class="panel-body" style="overflow-x:hidden;overflow-y:scroll;height:450px">' +
                '<form class="form-horizontal" role="form" id="registerForm">',
                '<!--ERROR MSGS-->',
                '<label for="register_user" class="error">That username is already in use...</label>',
                '<!--/ERROR MSGS-->',
                '<!--OK MSGS-->',
                '<label for="register_email" class="ok">Check your email to confirm your account</label>',
                '<!--/OK MSGS-->',
                '<div class="form-group">',
                ' <div class="col-sm-5"><input type="text" id="txtName" placeholder="Nome..." data-bind="value: name" name="Nome" data-required-msg="Nome obrigatório" required></div>',
                ' <div class="col-sm-5"><input type="text" name="Sobrenome" id="txtLastName" placeholder="Sobrenome..." data-bind="value: lastname" required></div>',
                '</div>',
                '<div class="form-group">',
                '<div class="col-sm-3"><input type="text" name="email" id="txtEmail" placeholder="Email..." data-bind="value: email" required></div>',
                '<div class="col-sm-3"><input type="text" name="CPF" id="txtDocumentId" placeholder="CPF..." data-bind="value: documentId" required></div>',
                '<div class="col-sm-3"><input type="text" name="Celular" id="txtMobile" placeholder="Celular..." data-bind="value: mobile" required></div>',
                '</div>',
                '<div class="form-group">',
                '<input type="text" name="DataNascimento" id="txtBirthday" placeholder="Data Nascimento..." data-bind="value: birthday" required>',
                '</div>',
                //'<input type="text" name="Cidade" id="txtCity" placeholder="Cidade..." data-bind="value: city" required>',
                //'<input type="text" name="Estado" id="txtState" placeholder="Estado..." data-bind="value: state" required>',
                '<div class="form-group">',
                '<select id="ddlCondo" placeholder="Fonte" data-required-msg="Selecione um condomínio" data-bind="value: font" name="Fonte" tabindex="14" required style="margin-top: 10px; margin-bottom: 10px;">' +
                '<option unselectable="on"  value="" >--Selecione um Condomínio--</option>' +
                '<option value="34" >Auge Home Resort</option>' +
                '<option value="4">Domo Home</option>' +
                '<option value="6">Domo Life</option>' +
                '<option value="5">Domo Prime</option>' +
                '<option value="33">Domo Business</option>' +
                '<option value="35">Portal Magistrale</option>' +
                '</select>',
                '<span class="k-invalid-msg" data-for="ddlCondo"></span></div>',
                '<input type="text" name="Apartamento" id="txtApartament" placeholder="Apartamento..." data-bind="value: apartment" required>',
                '<input type="text" name="Bloco" id="txtBuilding" placeholder="Edifício..." data-bind="value: building" required>',
                '<input type="password" name="Senha" id="registerPassword" placeholder="Senha..." data-bind="value: password" required>',
                '<input type="password" name="Confirmar Senha" id="txtConfirmPassword" placeholder="Confirme a senha..." data-bind="value: confirmpassword" required>',
                '<div>',
                '<div class="form-group">',
                '<span>Como nos conheceu?</span>',
                '<select dropdownFont" id="ddlCondo" placeholder="Fonte" data-role="dropdownlist" data-bind="value: font" name="Fonte" tabindex="14" required>' +
                '<option id="1" value="1" selected>Facebook</option>' +
                '<option id="2" value="2">Indicação</option>' +
                '<option id="3" value="3">Google</option>' +
                '</select></div>',
                '</div>',
                //'<input type="checkbox" name="register_terms" id="register_terms">',
                //'<label for="register_terms">Eu estou de acordo</label>',
                //'<a href="#">Termos de Serviço</a>',
                '</form></div>',
                '<br><br>',
                '<input type="submit" id="register-form" name="" value="Registrar" class="registerUser" />',
                '<p>Eu já sou um membro EasyPão!<br><a href="#" class="popup login">Efetuar Login</a></p>',
                '</article>', +
                '</div>',
                '<!--/REGISTER FORM-->'
            ].join("\n")),
            //registerCondo = $([newcity].join("\n")),
            condoForm = $([newcity].join("\n")),
            resetForm = $([
                '<!--RESET FORM-->',
                '<div>',
                '<span id="Notification"></span>',
                '<div id="appendto" class="demo-section k-content text-justify"></div>',
                '</div>',
                '<article class="form-box reset">',
                '<a href="#" class="form-close">',
                '<img src="images/form-close.png" alt="close">',
                '</a>',
                '<img src="images/form-logo.png" alt="logo">',
                '<form id="reset-form">',
                '<!--OK MSGS-->',
                '<label for="reset_email" class="ok">The new password was sent to your email</label>',
                '<!--/OK MSGS-->',
                '<input type="text" name="reset_email" id="reset_email" placeholder="Email...">',
                '<input type="checkbox" name="reset_generate" id="reset_generate">',
                '<label for="reset_generate">Gerar nova Senha</label>',
                '</form>',
                '<input type="submit" form="reset-form" value="Recuperar Senha">',
                '</article>',
                '<!--/RESET FORM-->',
                '<!--/LOGIN REGISTER RESET FORMS-->'
            ].join("\n"));


        $('body').append(overlay)
            .append(condoForm)
            //.append(registerCondo)
            .append(loginForm)
            .append(registerForm)
            .append(resetForm);


        $('.registerCondo').click(function () {
            kendo.ui.progress($("#registerCondoForm"), true);
            var register = new RegisterCondoWindowViewModel(this);
            register.onButtonRegisterClick();
        });

        $('.registerUser').click(function () {
            kendo.ui.progress($("#registerForm"), true);
            var register = new RegisterWindowViewModel(this);
            register.onButtonRegisterClick();
        });

        $('#loginUser').click(function () {
            if ($(".pagamento").length == 0)
                kendo.ui.progress($("#login-form"), true);
            var login = new LoginWindowViewModel(this);
            login.onButtonLoginClick();
        });


        // vertically center form boxes
        $('.form-box').each(function () {
            var form = $(this),
                formBoxHeight = form.outerHeight();
            form.css('marginTop', -formBoxHeight / 2);
        });

        // popup open
        $('.popup').click(function (e) {
            e.preventDefault();
            var button = $(this);

            // show form overlay
            $('.form-box-overlay').fadeIn(600);

            // hide previous form
            button.parents('.form-box').fadeOut(600);

            // show login form and focus
            if (button.hasClass('login')) {
                $('#loginDiv').show();
                $('.form-box.login').fadeIn(600);
                $('#login_user').focus();
            }
            // show register form and focus
            if (button.hasClass('register')) {
                $('#registerDiv').show();
                $('.form-box.register').fadeIn(600);
                $('#register_name').focus();

                $('#txtMobile').kendoMaskedTextBox({ mask: "(99) 99999-9999" });
                $('#txtDocumentId').kendoMaskedTextBox({ mask: "999.999.999-99" });
                $('#txtBirthday').kendoDatePicker();
                $("#txtBirthday").attr("readonly", "readonly");
            }

            // show register form and focus
            if (button.hasClass('newcity')) {
                $('#condoDiv').show();
                $(".textcity").show();
                $('.form-box.condo').fadeIn(600);
                $('.namecity').text(button[0].innerText);
                $('#txtCondoName').focus();
            }

            // show register form and focus
            if (button.hasClass('condo')) {
                $('#condoDiv').show();
                $(".textcity").hide();
                $('.form-box.condo').fadeIn(600);
                $('#txtCondoName').focus();
            }

            // show reset form and focus
            if (button.hasClass('reset')) {
                $('.form-box.reset').fadeIn(600);
                $('#reset_email').focus();
            }

            // disable scroll
            $('body').addClass('noscroll');
        });

        // popup close
        $('.form-close').click(function (e) {
            e.preventDefault();
            // close active form
            $(this).parent().fadeOut(600);

            $('.form-box.condo').fadeOut(600);
            // close form overlay
            $('.form-box-overlay').fadeOut(600);

            // enable scroll
            $('body').removeClass('noscroll');
        });

    }
});
