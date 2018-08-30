class MainHeaderBottonView extends BaseView {

    constructor(protected viewModel: MainHeaderBottonViewModel) {
        super('../Content/templates/MainHeaderBottonView.tmpl.html',
            '#template-header-botton-view',
            viewModel);
    }

    renderInternals() {        

    }

    onLogoutClick() {

        kendo.ui.progress($('#single-panel-layout'), true);
        if (app.user != null) {
            app.user = null;
        }
        document.cookie = '__WebApiAuthenticationToken' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        window.location.assign('/');
    }

}
