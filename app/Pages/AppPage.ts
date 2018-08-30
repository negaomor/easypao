var app: Application;

$(document).ready(() => {
    loadContext();
    
    app = new Application();
    app.run();        
});

function loadContext() {
    var authToken = HttpHelper.getWebApiAuthenticationTokenCookie();
    var app = new Application();
    sessionStorage.setItem('authToken', authToken);
}
