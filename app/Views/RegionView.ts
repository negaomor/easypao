class RegionView extends BaseView {

    private app = new Application();

    constructor(public viewModel: RegionViewModel) {
        super('./Content/templates/RegionView.tmpl.html',
            '#template-region-view',
            viewModel);
    }

    renderInternals() {        

    }


}