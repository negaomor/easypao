class MainNavigationBarViewModel extends BaseViewModel {
    user: UserModel;    
    dataSource: Object;

    constructor() {
        super();
    }

    refresh() {
        //if (easyuser != undefined) {
        //    $('#loginaction').text('SAIR');
        //    $('#login').find('p').text('')
        //    $('#login').find('p').append('<a href="">Meus Pedidos </a><ul><li><p>Meus Pedidos </p></li><li><p>Minha Conta </p></li></ul>')
        //}
    }

    onSetUser() {
        //if (easyuser != undefined)
        //{
        //    $('#loginaction').text('SAIR');
        //    $('#login').find('p').text('')
        //    $('#login').find('p').append('<a href="">Meus Pedidos </a><ul><li><p>Meus Pedidos </p></li><li><p>Minha Conta </p></li></ul>')
        //}
        //if (app.user == undefined) {
        //    var webapi = new WebApiHelper();
        //    var result = webapi.getUser()

        //    if (result.data != null) {

        //        app.user = result.data;

        //        this.set('user', app.user);
        //        //app.profile = this.user.profile;
        //        this.dataSource = this.user.functionality;
        //    }
        //    else {
        //        alert(result.jqXHR.statusText);
        //        return null;
        //    }
        //}
        //$('#HFName').text(app.user.contact.contactName);
        //$('#HFEmail').text(app.user.contact.email);
    }

}

