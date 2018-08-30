/**
 * The base class for creating new Kendo Windows.
 */
abstract class BaseDialog extends BaseView {

    private dialog: kendo.ui.Window;

    show() {
        this.render('#app-root');
        this.dialog.open();
    }

    close() {
        this.dialog.close();
    }

    renderInternals() {
        this.dialog = this.renderDialog();

        this.dialog.center();
        this.dialog.bind('close', (e: kendo.ui.WindowEvent) => { this.onClose(e); });
    }

    protected abstract renderDialog(): kendo.ui.Window;

    private onClose(e: kendo.ui.WindowEvent) {
        this.dialog.destroy();
        this.dialog = null;
    }

}