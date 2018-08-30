/**
 * The base class for creating a SPA Window. This is not a Kendo Window. A SPA Window is a set of views being displayed together.
 */
abstract class BaseWindow {

    protected static APP_ROOT_ELEMENT = '#app-root';
    private views: { [id: string]: BaseView; } = {};
    private open: boolean = false;

    /**
     * Return if the window is open or not.
     */
    isOpen(): boolean {
        return this.open;
    }

    /**
     * Display the window.
     */
    show() {
        if (!this.isOpen()) {
            var views = this.showInternals();
            this.open = true;
            this.addViews(views);
        }
    }

    /**
     * Hide the window.
     */
    close() {
        if (this.isOpen()) {
            this.closeInternals();
            this.open = false;
        }
    }

    /**
     * Returns a view, given the name.
     * @param name The view name.
     */
    getView(name: string): BaseView {
        var view = this.views[name];

        if (view == undefined || view == null) {
            view = null;
        }

        return view;
    }

    /**
     * Gives child-classes the opportunity to run custom code just before showing the SPA window.
     * @return The list of views used by the SPA window.
     */
    protected abstract showInternals(): BaseView[];

    /**
     * Gives child-classes the opportunity to run custom code just before closing the SPA window.
     */
    protected abstract closeInternals();

    private addViews(views: BaseView[]) {
        for (var index = 0; index < views.length; index++) {
            var view = views[index];

            this.views[view.content.replace('#template-', '')] = view;
        }
    }

    private clearViews() {
        this.views = {};
    }

}