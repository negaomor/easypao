class RegionDialog extends BaseView {

    protected viewModel: RegionViewModel;
    private regionWindow: kendo.ui.Window;

    constructor() {
        super('../Content/templates/RegionWindowView.tmpl.html',
            '#template-region-view', new RegionViewModel());
    }

    renderInternals() {       
        this.createLoginWindow();
    }

    open() {
        this.regionWindow.open().center();
        this.regionWindow.resize();
        //this.regionWindow.maximize();
    }

    close() {
        this.regionWindow.close();
    }

    private createLoginWindow() {
        var loginWindowHeight = 400;
        var loginWindowWidth = 350;

        this.regionWindow = $('#region-dialog').kendoWindow({
            actions: false,            
            width: loginWindowWidth,
            minHeight: loginWindowHeight,
            modal: true,
            visible: false,
            scrollable: false,        
            close: () => {
                $('#btnBack').click(function () {
                    var dialog = $("#region-dialog").data("kendoWindow");
                    dialog.close();
                });

                $(document).bind('keydown', (e) => {
                    if (e.keyCode == kendo.keys.ESC) {
                        var dialog = $("#region-dialog").data("kendoWindow");
                        dialog.close();
                        //var page = new IndexPage();
                        //page.getProductsContainer();
                        //page.showOrderWindow();
                    }
                });
            },
        }).data('kendoWindow');                         
    }

}

