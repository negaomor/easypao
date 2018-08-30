/**
 * Represents the application.
 */
class Application {
    public orderWindow: OrderWindow = null;
    private myShopWindow: MyShopWindow = null;
    private myCartWindow: MyCartWindow = null;
    private homeWindow: HomeWindow = null;
    private activeWindow: BaseWindow = null;
    private router: kendo.Router = null;

    public productsTemp: Array<ProductModel>;

    public user: ILoginResultData;
    /**
     * Starts the application and navigates to the default route.
     */
    run() {
        this.productsTemp = new Array<ProductModel>();
        //this.myShopWindow = new MyShopWindow();
        //this.myCartWindow = new MyCartWindow();
        this.homeWindow = new HomeWindow();
        this.intializeRouter();

        var easyuser = localStorage.getItem("easyuser");
        var productsTemp = sessionStorage.getItem("productsTemp")

        if (easyuser != null) { app.user = JSON.parse(easyuser) }
        if (productsTemp != null) { app.productsTemp = JSON.parse(productsTemp) }

        this.router.navigate('/home');

    }

    /**
     * Gets a view by name, from the active window.
     * @param name The view's name.
     */
    getView(name: string): BaseView {
        var view: BaseView = null;

        if (this.activeWindow != null) {
            view = this.activeWindow.getView(name);
        }

        return view;
    }

    /**
     * Initialize the router and all of its routes.
     */
    private intializeRouter() {
        this.router = new kendo.Router();
        //this.router = new kendo.Router({  pushState: false, root: ".." });
        // Route: DasBoard
        this.router.route('/shop', () => { kendo.ui.progress($('#app-root'), true); this.showWindow(this.myShopWindow); kendo.ui.progress($('#app-root'), false); });
        this.router.route('/home', () => { this.showWindow(this.homeWindow); });
        this.router.route('/checkout', () => { this.showWindow(this.myCartWindow); });
        this.router.start();
    }

    /**
     * Closes the active window, if any and then shows the new window.
     * @param window The new window.
     */
    private showWindow(window: BaseWindow) {
        if (this.activeWindow != null) {
            this.activeWindow.close();
        }

        this.activeWindow = window;

        window.show();
    }
}