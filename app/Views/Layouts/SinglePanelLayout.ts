class SinglePanelLayout extends BaseLayout {
    private navbarAreaElement: string = '#navbar-area';
    private toolbarAreaElement: string = '#toolbar-area';
    private panelAreaElement: string = '#panel-area';
    private views: BaseView[] = [];

    constructor() {
        super('../Content/templates/SingleLayout.tmpl.html',
            '#template-single-panel-layout');
    }

    renderInternals() {
        //function displayLoading(target) {
        //    var element = $(target);
        //    kendo.ui.progress(element, true);
        //    setTimeout(function () {
        //        kendo.ui.progress(element, false);
        //    }, 2000);
        //}

        //$(":button").click(function () {
        //    displayLoading(document.body);
        //});
        //$("a").click(function () {
        //    displayLoading(document.body);
        //});
        //$("span").click(function () {
        //    displayLoading(document.body);
        //});
    }

    show(container: string, navbar: BaseView, toolbar: BaseView, panel: BaseView): JQuery {
        var layout = super.render(container);

        this.showInNavbarArea(navbar);
        this.showInToolbarArea(toolbar);
        this.showInPanelArea(panel);

        return layout;
    }

    close() {
        for (var index = 0; index < this.views.length; index++) {
            this.views[index].destroy();
        }

        super.destroy();
    }

    showInNavbarArea(view: BaseView) {
        if (view != null) {
            this.views.push(view);
            this.showIn(this.navbarAreaElement, view);
        }
    }

    showInToolbarArea(view: BaseView) {
        if (view != null) {
            this.views.push(view);
            this.showIn(this.toolbarAreaElement, view);
        }
    }

    showInPanelArea(view: BaseView) {
        if (view != null) {
            this.views.push(view);
            this.showIn(this.panelAreaElement, view);
        }
    }

}