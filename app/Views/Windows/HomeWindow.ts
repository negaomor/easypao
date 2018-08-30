class HomeWindow extends BaseWindow {
    private headerBottonViewModel: MainHeaderBottonViewModel = null;
    private homeViewModel: HomeViewModel = null;    

    private layout: SinglePanelLayout = null;
    private headerBottonView: MainHeaderBottonView = null;    
    public homeView: HomeView = null;


    constructor() {
        super();
        this.headerBottonViewModel = new MainHeaderBottonViewModel();
        this.homeViewModel = new HomeViewModel();      
    }

    protected showInternals(): BaseView[] {
        this.layout = new SinglePanelLayout();
        this.headerBottonView = new MainHeaderBottonView(this.headerBottonViewModel);        
        this.homeView = new HomeView(this.homeViewModel);

        this.layout.render(BaseWindow.APP_ROOT_ELEMENT);
        this.layout.showInNavbarArea(this.headerBottonView);        
        //this.layout.showInNavbarArea(this.homeView);
        this.layout.showInPanelArea(this.homeView);
        
        return [this.headerBottonView ,this.homeView];
    }

    protected closeInternals() {
        this.homeView.destroy();        
        this.headerBottonView.destroy();
        this.layout.destroy();
    }
}