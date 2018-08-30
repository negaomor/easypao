class OrderWindow extends BaseWindow {
    //private navbarViewModel: MainNavigationBarViewModel = null;
    private orderViewModel: OrderViewModel = null;

    private layout: SinglePanelLayout = null;
    //private navbarView: MainNavigationBarView = null;
    public orderView: OrderView = null;


    constructor() {
        super();
        //this.navbarViewModel = new MainNavigationBarViewModel();
        this.orderViewModel = new OrderViewModel();
    }

    protected showInternals(): BaseView[] {
        this.layout = new SinglePanelLayout();
        //this.navbarView = new MainNavigationBarView(this.navbarViewModel);
        this.orderView = new OrderView(this.orderViewModel);

        this.layout.render(BaseWindow.APP_ROOT_ELEMENT);
        //this.layout.showInNavbarArea(this.navbarView);
        //this.layout.showInPanelArea(this.coordinatesView);

        return [this.orderView];
    }

    protected closeInternals() {
        this.orderView.destroy();
        //this.navbarView.destroy();
        //this.layout.destroy();
    }
}