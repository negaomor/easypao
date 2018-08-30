class MyShopWindow extends BaseWindow {
    private navbarViewModel: MainNavigationBarViewModel = null;
    private myShopViewModel: MyDashBoardViewModel = null;
    //private myProjectsToolbarViewModel: MyProjectsToolbarViewModel = null;

    private layout: SinglePanelLayout = null;
    private navbarView: MainNavigationBarView = null;    
    public myShopView: MyShopView = null;


    constructor() {
        super();
        this.navbarViewModel = new MainNavigationBarViewModel();
        this.myShopViewModel = new MyDashBoardViewModel();
        //this.myProjectsToolbarViewModel = new MyProjectsToolbarViewModel();
    }

    protected showInternals(): BaseView[] {
        this.layout = new SinglePanelLayout();
        //this.navbarView = new MainNavigationBarView(this.navbarViewModel);
        //this.toolbarView = new MyProjectsToolbarView(this.myProjectsToolbarViewModel);

        //this.myShopView = new MyShopView(this.myShopViewModel);

        this.layout.render(BaseWindow.APP_ROOT_ELEMENT);
        //this.layout.showInNavbarArea(this.navbarView);
        //this.layout.showInToolbarArea(this.toolbarView);
        //this.layout.showInPanelArea(this.myShopView);

        //return [this.navbarView, this.toolbarView, this.myProjectsView];
        //return [this.myShopView];
        return [];
    }

    protected closeInternals() {
        //this.myShopView.destroy();
        //this.toolbarView.destroy();
        //this.navbarView.destroy();
        this.layout.destroy();
    }
}