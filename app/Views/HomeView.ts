class HomeView extends BaseView {

    constructor(public viewModel: HomeViewModel) {
        super('../Content/templates/HomeView.tmpl.html',
            '#template-home-view',
            viewModel);
    }

    renderInternals() {
        //kendo.culture("pt-BR");
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

        $('.loginUser').click(function () {
            kendo.ui.progress($("#login-form"), true);
            var login = new LoginWindowViewModel(this);
            login.onButtonLoginClick();
        });

        $('.cities').change(function (e: any) {
            if (e.target.selectedIndex > 0) {
                $('#condos').hide();
                $('#msgNewCities').show();
                $('#btnNewCondo').text('Quero Cadastro a Minha Cidade e o Meu Condomínio');
            }
            else {
                $('#condos').show();
                $('#msgNewCities').hide();
                $('#btnNewCondo').text('Meu Condomínio Não Está Na Lista Quero Cadastrar');
            }
        });

        $('.popup').click(function (e) {
            e.preventDefault();
            var button = $(this);

            // show form overlay
            $('.form-box-overlay').fadeIn(600);

            // hide previous form
            button.parents('.form-box').fadeOut(600);

            // show register form and focus
            if (button.hasClass('condo')) {
                $('.form-box.condo').fadeIn(600);
                $('#register_name').focus();
            }
        });

        $('.orderFloating').click(function () {
            location.href = "#/shop";
            $('.box').hide();
        });

        $('.box').show();
        var easyuser = localStorage.getItem('easyuser');
        if (easyuser != null) {
            $('#loginaction').text('SAIR');
            $('#login').find('p').text('')
            $('#login').find('p').append('<p>Olá <a href="#">' + app.user.name + '</a></p><a href="">Meus Pedidos </a><ul><li><p>Meus Pedidos </p></li><li><p>Minha Conta </p></li></ul>')
        }
        var productsTemp = sessionStorage.getItem("productsTemp");
        if (productsTemp != null) {
            $('#menubasket').show();
            $('#menuassine').hide();
            var myTotal = 0;
            var myQtd = 0;
            productsTemp = JSON.parse(productsTemp);
            for (var i = 0, len = productsTemp.length; i < len; i++) {
                myTotal += productsTemp[i].valor;
                myQtd += productsTemp[i].qtd;
            }
            $('#basketCART').text(myQtd);
            $('#basketQTD').text(myQtd);
            $('#basketTOTAL').text(myTotal);
        }
        else {
            $('#menubasket').hide();
            $('#menuassine').show();
        }
    }

    setObjects() {
        //$('#spanRecentProjects').text(topograph.messages.dashboard.recentprojects);
        //$('#panel-area-title').text(topograph.messages.dashboard.title);
        //$('#pEquipament').text(topograph.messages.dashboard.equipament)
        //$('#pProjects').text(topograph.messages.dashboard.project)
        //$('#pSettings').text(topograph.messages.dashboard.settings)
    }

}