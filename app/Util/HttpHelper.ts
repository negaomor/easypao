class HttpHelper {

    public static WEBAPI_AUTHENTICATION_TOKEN = '__WebApiAuthenticationToken';

    public static getWebApiAuthenticationTokenCookie(): string {
        return "";//$.cookie(HttpHelper.WEBAPI_AUTHENTICATION_TOKEN);
    }

    public static remoteWebApuAuthenticationTokenCookie() {
        $.removeCookie(HttpHelper.WEBAPI_AUTHENTICATION_TOKEN);
    }

}