class MyCartWindow extends BaseWindow {
    private navbarViewModel: MainNavigationBarViewModel = null;
    private myCartViewModel: MyCartViewModel = null;    

    private layout: SinglePanelLayout = null;
    private navbarView: MainNavigationBarView = null;    
    public myCartView: MyCartView = null;


    constructor() {
        super();
        this.navbarViewModel = new MainNavigationBarViewModel();
        this.myCartViewModel = new MyCartViewModel();      
    }

    protected showInternals(): BaseView[] {
        this.layout = new SinglePanelLayout();
        this.navbarView = new MainNavigationBarView(this.navbarViewModel);        
        this.myCartView = new MyCartView();

        this.layout.render(BaseWindow.APP_ROOT_ELEMENT);
        this.layout.showInNavbarArea(this.navbarView);        
        //this.layout.showInPanelArea(this.myCartView);
        
        return [this.navbarView];
    }

    protected closeInternals() {
        //this.myCartView.destroy();        
        this.navbarView.destroy();
        this.layout.destroy();
    }
}