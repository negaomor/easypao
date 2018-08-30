/**
* The base class for creating a SPA Window. This is not a Kendo Window. A SPA Window is a set of views being displayed together.
*/
var BaseWindow = (function () {
    function BaseWindow() {
        this.views = {};
        this.open = false;
    }
    /**
     * Return if the window is open or not.
     */
    BaseWindow.prototype.isOpen = function () {
        return this.open;
    };
    /**
     * Display the window.
     */
    BaseWindow.prototype.show = function () {
        if (!this.isOpen()) {
            var views = this.showInternals();
            this.open = true;
            this.addViews(views);
        }
    };
    /**
     * Hide the window.
     */
    BaseWindow.prototype.close = function () {
        if (this.isOpen()) {
            this.closeInternals();
            this.open = false;
        }
    };
    /**
     * Returns a view, given the name.
     * @param name The view name.
     */
    BaseWindow.prototype.getView = function (name) {
        var view = this.views[name];
        if (view == undefined || view == null) {
            view = null;
        }
        return view;
    };
    BaseWindow.prototype.addViews = function (views) {
        for (var index = 0; index < views.length; index++) {
            var view = views[index];
            this.views[view.content.replace('#template-', '')] = view;
        }
    };
    BaseWindow.prototype.clearViews = function () {
        this.views = {};
    };
    BaseWindow.APP_ROOT_ELEMENT = '#app-root';
    return BaseWindow;
}());
//# sourceMappingURL=BaseWindow.js.map